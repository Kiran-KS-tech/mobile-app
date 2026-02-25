const { google } = require('googleapis');

// @desc    Sync Google Calendar and analyze for burnout risk
// @route   POST /api/calendar/sync
// @access  Private
const syncCalendar = async (req, res) => {
    const { accessToken } = req.body;

    if (!accessToken) {
        return res.status(400).json({ message: 'Google OAuth token is required' });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    try {
        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            timeMax: (new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).toISOString(), // Next 7 days
            singleEvents: true,
            orderBy: 'startTime',
        });

        const events = response.data.items;

        // Burnout Detection Logic
        const analysis = analyzeBurnout(events);

        res.json({
            summary: "Calendar analysis complete",
            eventsFound: events.length,
            burnoutScore: analysis.score,
            status: analysis.status,
            recommendation: analysis.recommendation,
            events: events.map(e => ({
                summary: e.summary,
                start: e.start.dateTime || e.start.date,
                end: e.end.dateTime || e.end.date,
            }))
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to sync with Google Calendar', error: error.message });
    }
};

const analyzeBurnout = (events) => {
    if (!events || events.length === 0) {
        return { score: 0, status: 'Low', recommendation: 'Your schedule looks clear. Good time for deep work!' };
    }

    let totalDurationMinutes = 0;
    let backToBackCount = 0;
    let prevEnd = null;

    events.forEach(event => {
        const start = new Date(event.start.dateTime || event.start.date);
        const end = new Date(event.end.dateTime || event.end.date);
        const duration = (end - start) / (1000 * 60);
        totalDurationMinutes += duration;

        if (prevEnd && (start - prevEnd) < (5 * 60 * 1000)) { // Less than 5 mins gap
            backToBackCount++;
        }
        prevEnd = end;
    });

    // Score calculation (weighted average of meeting time and back-to-back density)
    const hoursPerDayAvg = (totalDurationMinutes / 60) / 7;
    const score = Math.min(100, Math.round((hoursPerDayAvg / 4) * 50 + (backToBackCount / events.length) * 50));

    let status = 'Mild';
    let recommendation = 'Keep an eye on your meeting frequency.';

    if (score > 75) {
        status = 'High Risk';
        recommendation = 'Critical meeting density detected. We recommend blocking 1 hour of "Quiet Time" today.';
    } else if (score > 50) {
        status = 'Moderate';
        recommendation = 'Moderate workload. Try to schedule short breaks between meetings.';
    }

    return { score, status, recommendation };
};

module.exports = {
    syncCalendar,
};
