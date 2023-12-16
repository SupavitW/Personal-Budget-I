const envelopeIdCounter = 2;

const envelopes = [
    {
        id: "1" ,
        budget: 1000 ,
        title: "video games",
    },

    {
        id: "2" ,
        budget: 2000 ,
        title: "clothes",
    },
];

// function to validate new envelope's properties
const validEnvelope = instance => {
    if (!isInteger(instance.budget)) {
        throw new Error("Envelope's budget must be in number.");
    }
    if (!isString(instance.title)) {
        throw new Error("Envelope's title must be in proper characters.")
    }
    return true;
};

// funtion to get all envelopes
const getEnvelopes = () => {
    return envelopes;
};

// function to push the newly created envelope
const createEnvelope = instance => {
    if (validEnvelope(instance)) {
        instance.id = `${envelopeIdCounter++}`;
        envelopes.push(instance);
        return envelopes[envelopes.length - 1];
    } else {
        throw new Error('Envelopes must have valid properties');
    }
;}

module.exports = {
    getEnvelopes,
    createEnvelope,
}