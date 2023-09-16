const Tour = require(`./../model/tourModel`);

//Todo: Createing an aliasing rout handler
exports.aliasTopTours = (req, _, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-reatingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary';
  next();
};

//TODO: Handler fucntions for tours requiests
exports.getAllTours = async (req, res) => {
  try {
    //* Taking and filtering the params
    const queryObj = Object.create(req.query);
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //* Appling advance filter where condition get filter i.e. gte -> $gte
    let queryStr = JSON.stringify(queryObj);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/, (match) => `$${match}`),
    );

    //TODO: Take query from params
    //* 1: filter
    let query = Tour.find(queryStr);

    //* 2: sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      // query = query.sort('-createdAt'); //Will anable when have differnet dates
    }

    //*3. fields of projection
    if (req.query.fields) {
      const fieldsStr = req.query.fields.split(',').join(' ');
      query = query.select(fieldsStr);
    } else {
      query = query.select('-__v'); //Excluding property added by mongoose
    }

    //4. pagenation
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 100;
    const skiptill = (page - 1) * limit;
    query = query.skip(skiptill).limit(limit);

    if (req.query.page) {
      const docCount = await Tour.countDocuments();
      if (skiptill >= docCount) throw new Error('No more Tours');
    }

    //TODO: Getting tour as result after ppling all filters
    const tour = await query;

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
      message: err.message,
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
