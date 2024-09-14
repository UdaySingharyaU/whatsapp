
import Request from "../model/request.model.js";
const requestController = {
    sendRequest: async (req, res) => {
        try {
            const sender = await Request.fidnById({ _id: req.user.id });
            if (!sender) {
                return res.status(400).json({
                    status: false,
                    message: "Send User Not exist",
                })
            }
            const receiver = await User.findById({ _id: req.params.receiverId });
            if (!receiver) {
                return res.status(400).json({
                    status: false,
                    message: "recevier User Not exist",
                })
            }
            const newRequest = new Request({
                to: req.params.receiverId,
                from: req.user.id,
            })
            await newRequest.save();
            return res.status(200).json({
                status: true,
                message: 'Request Send Successfully'
            })
        } catch (err) {
            return res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || "Internal Server Error",
            })
        }
    },


    actionOnRequest: async (req, res) => {
        try {
            const sender = await Request.fidnById({ _id: req.user.id });
            if (!sender) {
                return res.status(400).json({
                    status: false,
                    message: "Send User Not exist",
                })
            }
            const request = await User.findById({ _id: req.params.requestId });
            if (!request) {
                return res.status(400).json({
                    status: false,
                    message: "request  Not exist",
                })
            }
            const {status}=req.body;
            request.status=status;
            request.from=req.user.id;
            await request.save();
            return res.status(200).json({
                status: true,
                message: `Request ${status} Successfully`,
                data:request
            })
        } catch (err) {
            return res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || "Internal Server Error",
            })
        }
    },


    getAllRequest: async (req, res) => {
        try {
            const allrequest = await Request.find({_id:req.user.id,isRead:false});
            if (!allrequest) {
                return res.status(400).json({
                    status: false,
                    message: "No request",
                    data:null,
                })
            }
            
            return res.status(200).json({
                status: true,
                message: `All Request get Successfully`,
                data:allrequest
            })
        } catch (err) {
            return res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || "Internal Server Error",
            })
        }
    }
}


export default requestController;