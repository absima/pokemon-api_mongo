// simple model
import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected!'))
  .catch(() => console.log('not connected!'));

// const db = mongoose.connection
// db.on("error", (error) => console.error(error))
// db.once("open", () => console.log("Connected to Database"))

const pokemonSchema = new mongoose.Schema(
  {
    id: Number,
    name: {
      english: String,
      japanese: String,
      chinese: String,
      french: String,
    },
    type: [String],
    base: {
      HP: Number,
      Attack: Number,
      Defense: Number,
      SpAttack: Number,
      SpDefense: Number,
      Speed: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

app.get('/', (req, res) => res.status(200).json({ hello: 'welcome' }));

// Create pokemon
app.post('/pokemons', async (req, res) => {
  const pokemon = new Pokemon({
    id: req.body.id,
    name: {
      english: req.body.name.english,
      japanese: req.body.name.japanese,
      chinese: req.body.name.chinese,
      french: req.body.name.french,
    },
    type: req.body.type,
    base: {
      HP: req.body.base.HP,
      Attack: req.body.base.Attack,
      Defense: req.body.base.Defense,
      SpAttack: req.body.base.SpAttack,
      SpDefense: req.body.base.SpDefense,
      Speed: req.body.base.Speed,
    },
  });
  try {
    const newPokemon = await pokemon.save();
    res.status(201).json(newPokemon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all pokemons

app.get('/pokemons', async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read pokemon by id
app.get('/pokemons/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.find({ id: req.params.id });
    res.json(pokemon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete pokemon by id
app.delete('/pokemons/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    if (pokemon == null) {
      return res.status(404).json({ message: 'Cannot find pokemon' });
    }
    await pokemon.remove();
    res.json({ message: 'Deleted Pokemon' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));

// // Update pokemon by id
// app.put('/pokemons/:id', async (req, res) => {
//   try {
//     const pokemon = await Pokemon.findOne({ id: req.params.id });
//     if (pokemon == null) {
//       return res.status(404).json({ message: 'Cannot find pokemon' });
//     }
//     if (req.body.name != null) {
//       pokemon.name = req.body.name;
//     }
//     if (req.body.type != null) {
//       pokemon.type = req.body.type;
//     }
//     if (req.body.base != null) {
//       pokemon.base = req.body.base;
//     }
//     const updatedPokemon = await pokemon.save();
//     res.json(updatedPokemon);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // CRUD

// // simple model
// import 'dotenv/config';
// import mongoose from 'mongoose';
// import express from 'express';
// import cors from 'cors';

// const port = process.env.PORT || 5000;
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose
//   .connect(port, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('connected!'))
//   .catch(() => console.log('not connected!'));

// // const db = mongoose.connection
// // db.on("error", (error) => console.error(error))
// // db.once("open", () => console.log("Connected to Database"))

// const pokemonSchema = new mongoose.Schema(
//   {
//     id: Number,
//     name: {
//       english: String,
//       japanese: String,
//       chinese: String,
//       french: String,
//     },
//     type: [String],
//     base: {
//       HP: Number,
//       Attack: Number,
//       Defense: Number,
//       SpAttack: Number,
//       SpDefense: Number,
//       Speed: Number,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// app.get('/', (req, res) => res.status(200).json({ hello: 'welcome' }));

// // Create pokemon
// app.post('/pokemons', async (req, res) => {
//   const pokemon = new Pokemon({
//     id: req.body.id,
//     name: {
//       english: req.body.name.english,
//       japanese: req.body.name.japanese,
//       chinese: req.body.name.chinese,
//       french: req.body.name.french,
//     },
//     type: req.body.type,
//     base: {
//       HP: req.body.base.HP,
//       Attack: req.body.base.Attack,
//       Defense: req.body.base.Defense,
//       SpAttack: req.body.base.SpAttack,
//       SpDefense: req.body.base.SpDefense,
//       Speed: req.body.base.Speed,
//     },
//   });
//   try {
//     const newPokemon = await pokemon.save();
//     res.status(201).json(newPokemon);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Read all pokemons

// app.get('/pokemons', async (req, res) => {
//   try {
//     const pokemons = await Pokemon.find();
//     res.json(pokemons);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Read pokemon by id
// app.get('/pokemons/:id', async (req, res) => {
//   try {
//     const pokemon = await Pokemon.find({ id: req.params.id });
//     res.json(pokemon);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Delete pokemon by id
// app.delete('/pokemons/:id', async (req, res) => {
//   try {
//     const pokemon = await Pokemon.findOne({ id: req.params.id });
//     if (pokemon == null) {
//       return res.status(404).json({ message: 'Cannot find pokemon' });
//     }
//     await pokemon.remove();
//     res.json({ message: 'Deleted Pokemon' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.listen(port, () => console.log(`Server started on port ${port}`));

// // // Update pokemon by id
// // app.put('/pokemons/:id', async (req, res) => {
// //   try {
// //     const pokemon = await Pokemon.findOne({ id: req.params.id });
// //     if (pokemon == null) {
// //       return res.status(404).json({ message: 'Cannot find pokemon' });
// //     }
// //     if (req.body.name != null) {
// //       pokemon.name = req.body.name;
// //     }
// //     if (req.body.type != null) {
// //       pokemon.type = req.body.type;
// //     }
// //     if (req.body.base != null) {
// //       pokemon.base = req.body.base;
// //     }
// //     const updatedPokemon = await pokemon.save();
// //     res.json(updatedPokemon);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // // CRUD
