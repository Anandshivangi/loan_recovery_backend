const User=require("../../models/masteUsersModel");

// Get Data
// const master_admin= async (req, res) => {
    
//     try {
//         const Users = await User.find({}, 'adminName empID bankName area');
//         res.json(Users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
// Get and Search Data with Pagination
const master_admin_serach=async (req, res) => {
    try {
        //    const Users_data = await User.find({}, 'adminName empID bankName area');
        //     res.json(Users_data);
        //     res.status(500).json({ message: err.message });
            
        const { page = 1, limit = 10, search = '' } = req.query;

        const query = {
            $or: [
                { adminName: { $regex: search, $options: 'i' } },
                { empID: { $regex: search, $options: 'i' } },
                { bank_name: { $regex: search, $options: 'i' } },
                { area: { $regex: search, $options: 'i' } }
            ]
        };

        const Users = await User.find(query)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .exec();

        const count = await User.countDocuments(query);

        res.json({
            Users,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
module.exports={master_admin, master_admin_serach}