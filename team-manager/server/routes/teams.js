const router = require('express').Router();
let Team = require('../models/team.model');

router.route('/').get((req, res) => {
  Team.find()
    .then(teams => res.json(teams))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newTeam = new Team({
    username,
    description,
    duration,
    date,
  });

  newTeam.save()
  .then(() => res.json('Team added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Team.findById(req.params.id)
    .then(team => res.json(team))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Team.findByIdAndDelete(req.params.id)
    .then(() => res.json('Team deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Team.findById(req.params.id)
    .then(team => {
        team.username = req.body.username;
        team.description = req.body.description;
        team.duration = Number(req.body.duration);
        team.date = Date.parse(req.body.date);

      team.save()
        .then(() => res.json('Team updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;