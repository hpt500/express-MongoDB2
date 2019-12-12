const crypto = require('crypto');
const { argv } = require('yargs');
const { mongoose } = require('../core/mongodb.js');
const autoIncrement = require('mongoose-auto-increment');

const adminSchema = new mongoose.Schema({
    // 名字
    name: { type: String, required: true, default: '' },

    //用户类型 0：管理者，1：其他用户 
    type: { type: Number, required: true, default: 1 },

    // 手机
    phone: { type: Number, required: true, default: '' },

    // 邮箱
    email: { type: String, required: true, default: '' },

    // 密码
    password: {
        type: String,
        required: true,
        default: crypto
            .createHash('md5')
            .update(argv.auth_default_password || 'root')
            .digest('hex'),
    },

    // 创建日期
    create_time: { type: Date, default: Date.now },

    // 最后修改日期
    update_time: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', adminSchema);