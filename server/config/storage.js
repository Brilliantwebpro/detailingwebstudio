const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class JSONStorage {
  constructor(filename) {
    this.filepath = path.join(DATA_DIR, `${filename}.json`);
    this.data = this._load();
  }

  _load() {
    try {
      if (fs.existsSync(this.filepath)) {
        return JSON.parse(fs.readFileSync(this.filepath, 'utf8'));
      }
    } catch (error) {
      console.error(`Error loading ${this.filepath}:`, error);
    }
    return [];
  }

  _save() {
    try {
      fs.writeFileSync(this.filepath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error(`Error saving ${this.filepath}:`, error);
    }
  }

  // Find all documents
  find(query = {}) {
    return this.data.filter(item => {
      return Object.keys(query).every(key => {
        if (typeof query[key] === 'object' && query[key] !== null) {
          // Handle operators like $gte, $in, etc.
          if (query[key].$gte) return item[key] >= query[key].$gte;
          if (query[key].$lte) return item[key] <= query[key].$lte;
          if (query[key].$in) return query[key].$in.includes(item[key]);
          return true;
        }
        return item[key] === query[key];
      });
    });
  }

  // Find one document
  findOne(query) {
    return this.data.find(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  // Find by ID
  findById(id) {
    return this.data.find(item => item._id === id);
  }

  // Insert document
  insert(doc) {
    const newDoc = {
      ...doc,
      _id: this._generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.push(newDoc);
    this._save();
    return newDoc;
  }

  // Update document
  update(id, updates) {
    const index = this.data.findIndex(item => item._id === id);
    if (index === -1) return null;
    
    this.data[index] = {
      ...this.data[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this._save();
    return this.data[index];
  }

  // Delete document
  delete(id) {
    const index = this.data.findIndex(item => item._id === id);
    if (index === -1) return false;
    
    this.data.splice(index, 1);
    this._save();
    return true;
  }

  // Count documents
  count(query = {}) {
    return this.find(query).length;
  }

  // Generate unique ID
  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Clear all data
  clear() {
    this.data = [];
    this._save();
  }
}

// Export storage instances
module.exports = {
  users: new JSONStorage('users'),
  leads: new JSONStorage('leads'),
  chatMessages: new JSONStorage('chatMessages')
};
