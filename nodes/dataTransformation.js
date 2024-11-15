//this node will handle transformations, such as merging
//documents and adding custom fields

const dataTransformationNode = {
    type: "dataTransformationNode",
    label: "Data Transformation",
    parameters: [
        { name: "inputData", type: "json", label: "Input Data" },
        { name: "customFieldLogic", type: "json", label: "Custom Field Logic" }
    ],
    async function ({ cognigy, config }) {
        const { api } = cognigy;
        const { inputData, customFieldLogic } = config;

        try {
            const transformedData = inputData.map(item => {
                //custom URL field based on logic
                const url = `fir3/line-items/VENDOR?companyCode=${item.CompanyCode}&documentNumber=${item.DocumentNumber}&fiscalYear=${item.FiscalYear}&lineItemNumber=${item.LineItemNumber}`;
                return { ...item, customURL: url };
            });

            api.say("Data transformation completed.");
            api.setContext("transformedData", transformedData);
        } catch (error) {
            api.say("Error during data transformation.");
            console.error(error);
        }
    }
};

module.exports = dataTransformationNode;
