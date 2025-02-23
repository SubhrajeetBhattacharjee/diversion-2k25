export default {
    async fetch(request, env, ctx) {
        // Ensure request method is POST
        if (request.method !== "POST") {
            return new Response(JSON.stringify({ error: "Only POST requests are allowed." }), {
                status: 405,
                headers: { "Content-Type": "application/json" }
            });
        }

        let requestData;
        try {
            requestData = await request.json();
        } catch (error) {
            return new Response(JSON.stringify({ error: "Invalid JSON format." }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Extract required fields
        const { amount, reputation, claim_frequency, geo_encoded } = requestData;
        if ([amount, reputation, claim_frequency, geo_encoded].some(v => v === undefined)) {
            return new Response(JSON.stringify({ error: "Missing required parameters." }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Extract client information
        const clientIP = request.headers.get("CF-Connecting-IP") || "unknown";
        const userAgent = request.headers.get("User-Agent") || "unknown";

        try {
            const isFraudulent = await detectFraud(clientIP, userAgent, amount, reputation, claim_frequency, geo_encoded);

            if (isFraudulent) {
                return new Response(JSON.stringify({ message: "Fraudulent activity detected." }), {
                    status: 403,
                    headers: { "Content-Type": "application/json" }
                });
            }

            return new Response(JSON.stringify({ message: "Request is legitimate." }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: "Internal server error.", details: error.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }
    }
};

async function detectFraud(ip, userAgent, amount, reputation, claim_frequency, geo_encoded) {
    const blockedIPs = ["192.0.2.1", "198.51.100.2"];
    const blockedAgents = ["BadBot", "MaliciousScraper"];

    if (blockedIPs.includes(ip) || blockedAgents.some(agent => userAgent.includes(agent))) {
        return true; // Fraud detected based on IP/User-Agent
    }

    // Call AI model for fraud detection
    try {
        const response = await fetch("https://your-api-endpoint.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, reputation, claim_frequency, geo_encoded })
        });

        if (!response.ok) {
            console.error("Error fetching fraud score:", response.status, await response.text());
            return false;
        }

        const result = await response.json();
        return result.fraudScore >= 0.5; // Adjust fraud threshold if needed

    } catch (error) {
        console.error("Error during fraud detection:", error);
        return false;
    }
}
