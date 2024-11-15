//this node will initialize the session by retrieving the DUNS and SAP identifiers
//(VendorId, CustomerId, BusinessPartnerId) and caching them

const axios = require('axios');

const sessionInitializationNode = {
    type: "sessionInitializationNode",
    label: "Session Initialization",
    parameters: [],
    async function ({ cognigy }) {
        const { api } = cognigy;
        
        try {
            //replace DUNS API endpoint and token if needed
            const dunsResponse = await axios.get(`${process.env.DUNS_API_BASE_URL}/get_duns`, {
                headers: { Authorization: `Bearer ${process.env.DUNS_API_TOKEN}` }
            });
            const duns = dunsResponse.data.DUNS;

            //get SAP Identifications based on DUNS
            const sapResponse = await axios.get(`${process.env.SAP_API_BASE_URL}/GetPartnerInfoFromDUNS(${duns})`, {
                headers: { Authorization: `Bearer ${process.env.SAP_API_TOKEN}` }
            });

            const { VendorId, CustomerId, BusinessPartnerId } = sapResponse.data;

            //cache these values for later use
            api.setContext("sapSession", {
                duns,
                VendorId,
                CustomerId,
                BusinessPartnerId
            });

            api.say("Session initialized successfully!");
        } catch (error) {
            api.say("Error during session initialization.");
            console.error(error);
        }
    }
};

module.exports = sessionInitializationNode;
