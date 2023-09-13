const Tour = require(`./../model/tourModel`);

//TODO: Handler fucntions for tours requiests
exports.getAllTours = async (req, res) => {
  try {
    const tour = await Tour.find();

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400 /*Bad requiest error*/).json({
      status: 'fail',
      message: 'Invalid data structure..',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400 /*Bad requiest error*/).json({
      status: 'fail',
      message: 'Invalid data structure..',
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    //*1st way of getting data
    // const newTour = await new Tour(req.body).save();

    //*2nd Way
    const newTour = await Tour.create(req.body);

    res.status(201 /*Creation code*/).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400 /*Bad requiest error*/).json({
      status: 'fail',
      message: 'Invalid data structure..',
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '<Tour updated>',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: null,
  });
};
