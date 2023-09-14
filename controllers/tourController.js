const Tour = require(`./../model/tourModel`);

//TODO: Handler fucntions for tours requiests
exports.getAllTours = async (req, res) => {
  try {
    const tour = await Tour.find({});
    res.status(200).json({
      status: 'success',
      results: tour.length,
      data: {
        tour: tour,
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

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204 /*No Content*/).json({
      status: 'success',
      message: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
