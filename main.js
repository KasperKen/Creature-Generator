// List of created creature objects
const creatures = [];


// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
};


// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
};


// Creates a creature with random DNA using factory function
const createCreature = (species = 'Not yet named') => {
  const creatureNumber = creatures.length + 1;
  return creatureFactory(creatureNumber, mockUpStrand(), species);
};


// Populates creature array with 30 creatures where likelyToSurvive = true
const findThirtyCreatures = () => {
  while (creatures.length < 30) {
    let currentCreature = createCreature();
    if (currentCreature.willLikelySurvive()) {
      creatures.push(currentCreature);
    }
  }
};


// Compares the DNA of two creatures
const compareDNA = (creature1, creature2) => {
  let matchingDNA = 0;
  for (let count = 0; count < creature1.DNA.length; count++) {
    if (creature1.DNA[count] === creature2.DNA[count]) matchingDNA++;
  };
  const percentMatch = (matchingDNA / creature1.DNA.length * 100).toFixed(2);
  console.log((`${percentMatch}% match.`));
};


// Factory Function which returns a creature object with random DNA
const creatureFactory = (number, dnaBase, species = "Not yet named") => {
  return {
    _species: species,
    _specimenNum: number,
    _dna: dnaBase,
    // Setters & Getters
    get species() {
      return this._species;
    },
    get specimenNum() {
      return this._specimenNum;
    },
    
    get DNA() {
      return this._dna;
    },
    set species(name) {
      this._species = name;
    },
    // Object Methods
    mutate() {
      let strandNum = Math.floor(Math.random() * this._dna.length);
      const holdVal = this._dna[strandNum];
      do {
        this._dna[strandNum] = returnRandBase();
      } while (strandNum === holdVal)
    },
    renameSpecies(name) {
      this._species = name;
    },
    willLikelySurvive() {
      let CorG = 0;
      for (let count = 0; count < this._dna.length; count++) {
        if (this._dna[count] === 'G' || this._dna[count] == 'C') {
          CorG++;
        }
      }
      const percentToSurvive = (CorG / this._dna.length * 100).toFixed(2);
      return percentToSurvive > 60 ? true : false;
    }
  }
};


findThirtyCreatures();
compareDNA(creatures[0], creatures[1]);
