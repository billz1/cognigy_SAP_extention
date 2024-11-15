//node will format the final output

const outputVisualizationNode = {
    type: "outputVisualizationNode",
    label: "Output Visualization",
    parameters: [
        { name: "outputData", type: "json", label: "Output Data" },
        { name: "visualizationType", type: "string", label: "Visualization Type", defaultValue: "tile" }
    ],
    async function ({ cognigy, config }) {
        const { api } = cognigy;
        const { outputData, visualizationType } = config;

        try {
            if (visualizationType === "tile") {
                const tiles = outputData.map(item => ({
                    title: item.DocumentNumber,
                    subtitle: item.CompanyCode,
                    content: `Amount: ${item.Amount} ${item.CurrencyCode}`
                }));
                api.say(JSON.stringify(tiles));
            } else {
                api.say(JSON.stringify(outputData));
            }
        } catch (error) {
            api.say("Error during output visualization.");
            console.error(error);
        }
    }
};

module.exports = outputVisualizationNode;
