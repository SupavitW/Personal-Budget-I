const budgetRouter = require('express').Router();

module.exports = budgetRouter;

// Utility functions
const {
    getEnvelopes,
    createEnvelope,
    findEnvelope,
    updateEnvelope,
    deleteEnvelope,
    tranferBudget,
} = require('../envelopesData');

// Router parameter for id
budgetRouter.param('id', (req, res, next, id) => {
  const envelope =  findEnvelope(req.params.id);
  if (!envelope) {
    const err = new Error('Cannot find the requested envelope id');
    err.status = 400;
    return next(err);
  }
  req.envelopeId = id;
  next()
});

// Get all envelopes
budgetRouter.get('/envelopes', (req, res, next) => {
  res.status(200).send(getEnvelopes());
});

// Get a specific envelope
budgetRouter.get('/envelopes/:id', (req, res, next) => {
  res.status(200).send(findEnvelope(req.envelopeId));
});

// Create a new envelope
budgetRouter.post('/createEnvelope', (req, res, next) => {
  const newEnvelope = createEnvelope(req.body);
  if (!newEnvelope) {
    const err = new Error('Envelopes must have valid properties');
    err.status = 400;
    return next(err);
  }
  res.status(201).send(newEnvelope);
});

// Update the existing envelope
budgetRouter.put('/updateEnvelope', (req, res, next) => {
  const updatedEnvelope = updateEnvelope(req.body);
  if (!updatedEnvelope) {
    const err = new Error('Invalid envelope properties');
    err.status = 400;
    return next(err);
  }
  res.status(200).send(updatedEnvelope);
});

// Delete the existing envelope
budgetRouter.delete('/deleteEnvelope/:id', (req, res, next) => {
  if (deleteEnvelope(req.envelopeId)) {
    res.status(204).send();
  } else {
    const err = new Error('Cannot find the requested envelope id');
    err.status = 400;
    return next(err);
  }
});

// Tranfer money from one envelope to another
budgetRouter.post('/transfer/:from/:to', (req, res, next) => {
  try {
    const transferResult = tranferBudget(req.params.from, req.params.to, req.query.amount);
    res.status(204).send();
 } catch (err) {
  // Pass the error to the next middleware (error handler)
  next(err);
 }
});

