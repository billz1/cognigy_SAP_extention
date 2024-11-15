//node for error handling with retries and fallbacks

const errorHandlingNode = {
    type: "errorHandlingNode",
    label: "Error Handling",
    parameters: [
        { name: "retryCount", type: "number", label: "Retry Count", defaultValue: 3 },
        { name: "fallbackData", type: "json", label: "Fallback Data" }
    ],
    async function ({ cognigy, config }) {
        const { api } = cognigy;
        const { retryCount, fallbackData } = config;
        let attempts = 0;

        while (attempts < retryCount) {
            try {
                //attempt API call
                //placeholder for API call logic
                api.say("API call succeeded on attempt " + (attempts + 1));
                return; //exit on success
            } catch (error) {
                attempts++;
                if (attempts >= retryCount) {
                    api.say("API call failed after retries. Returning fallback data.");
                    api.setContext("fallbackData", fallbackData);
                }
            }
        }
    }
};

module.exports = errorHandlingNode;
