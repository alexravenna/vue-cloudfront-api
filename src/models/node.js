const mongoose = require('../db');

module.exports = mongoose.model('Node', {
    owner: String,   // Owner id
    id: String,      // Unique id of node
    parent: String,  // Parent id
    lastModified: Number,   // Last modified timestamp
    type: String,    // 'dir' or 'file'
    name: String,    // Folder / filename,
    marked: Boolean, // If marked
    bin: Boolean, // If moved to bin
    staticIds: [String],

    // ==== File specific ===
    size: {
        required: false,
        type: Number
    },

    // ==== Folder specific ===
    color: {
        required: false,
        type: String // Hex color
    }
});
