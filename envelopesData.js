let envelopeIdCounter = 5;

const envelopes = [
    {
        id: "1" ,
        budget: 1000 ,
        title: "candies",
    },

    {
        id: "2" ,
        budget: 2000 ,
        title: "clothes",
    },

    {
        id: "3" ,
        budget: 3000 ,
        title: "games",
    },
    {
        id: "4" ,
        budget: 4000 ,
        title: "foods",
    },

];

// function to validate new envelope's properties
const validEnvelope = instance => {
    if (typeof instance.budget !== "number") {
        return null;
    }
    if (typeof instance.title !== "string") {
        return null;
    }
    return true;
};

// function to find envelope via id
const findEnvelope = id => {
    return envelopes.find((envelope) => envelope.id === id);
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
       return null;
    }
};

// function to update the existing envelope
const updateEnvelope = envelope => {
    const envelopeIndex = envelopes.findIndex(element => element.title === envelope.title);
    if (envelopeIndex === -1) {
        return null;
    }
    if (!validEnvelope(envelope)) {
        return null;
    }
    envelopes[envelopeIndex] = envelope;
    return envelopes[envelopeIndex];
};

// function to delete an envelope
const deleteEnvelope = id => {
    const envelopeIndex = envelopes.findIndex(envelope => envelope.id === id);
    if (envelopeIndex === -1) {
        return null;
    }
    envelopes.splice(envelopeIndex, 1);
    return true;
    // it does not delete;
};

// function to tranfer money
const tranferBudget = (giver, receiver, amount) => {
    const giverIndex = envelopes.findIndex(envelope => envelope.title === giver);
    const receiverIndex = envelopes.findIndex(envelope => envelope.title === receiver);
    const amountValue = parseFloat(amount);
  
    if (giverIndex === -1 || receiverIndex === -1) {
      const err = new Error("Cannot find the target envelopes");
      err.status = 400;
      throw err;
    }
  
    if (amountValue <= 0) {
      const err = new Error("The amount must be higher than 0");
      err.status = 400;
      throw err;
    }
  
    if (envelopes[giverIndex].budget < amountValue) {
      const err = new Error("Insufficient balance");
      err.status = 400;
      throw err;
    }

    if (giver === receiver) {
        const err = new Error("Invalid envelope targets");
        err.status = 400;
        throw err;
      }

    envelopes[receiverIndex].budget += amountValue;
    envelopes[giverIndex].budget -= amountValue;
    
    return "Transfer completed";
};

module.exports = {
    getEnvelopes,
    createEnvelope,
    findEnvelope,
    updateEnvelope,
    deleteEnvelope,
    tranferBudget,
}