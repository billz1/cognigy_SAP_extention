//this node allows chaining multiple API calls with filters,
//field selection, formatting, and language options.

const axios = require('axios');

const apiCallChainNode = {
    type: "apiCallChainNode",
    label: "API Call Chain",
    parameters: [
        { name: "endpoint", type: "string", label: "API Endpoint" },
        { name: "filters", type: "json", label: "Filters" },
        { name: "fields", type: "json", label: "Fields to Select" },
        { name: "format", type: "string", label: "Response Format", defaultValue: "json" },
        { name: "language", type: "string", label: "Language Code", defaultValue: "EN" }
    ],
    async function ({ cognigy, config }) {
        const { api } = cognigy;
        const { endpoint, filters, fields, format, language } = config;

        try {
            let url = `${process.env.SAP_API_BASE_URL}/${endpoint}?$format=${format}&sap-language=${language}`;

            if (filters) {
                for (const key in filters) {
                    url += `&${key}=${filters[key]}`;
                }
            }

            if (fields) {
                url += `&$select=${fields.join(",")}`;
            }

            const response = await axios.get(url, { headers: { Authorization: `Bearer ${process.env.SAP_API_TOKEN}` } });
            api.say(JSON.stringify(response.data));
        } catch (error) {
            api.say("Error during API call chain execution.");
            console.error(error);
        }
    }
};

module.exports = apiCallChainNode;
