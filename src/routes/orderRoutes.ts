import { RequestHandler, Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrderById as RequestHandler);
router.post("/", createOrder as RequestHandler);
router.put("/:id", updateOrder as RequestHandler);
router.delete("/:id", deleteOrder as RequestHandler);

export default router;
