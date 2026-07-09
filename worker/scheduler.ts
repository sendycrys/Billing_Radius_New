import cron from "node-cron"
import { billingService } from "../services/billing.service"
import { radiusService } from "../services/radius.service"

export function initScheduler() {
  console.log("[Scheduler] Initializing cron jobs...");

  // 1. Generate Invoices at 00:00 on the 1st of every month
  cron.schedule("0 0 1 * *", async () => {
    console.log("[Scheduler] Running cron: Generate Invoices");
    try {
      await billingService.generateMonthlyInvoices();
    } catch (error) {
      console.error("[Scheduler] Error generating invoices:", error);
    }
  });

  // 2. Suspend overdue users at 22:00 everyday
  cron.schedule("0 22 * * *", async () => {
    console.log("[Scheduler] Running cron: Suspend overdue users");
    // TODO: Fetch overdue invoices and call radiusService.suspendUser()
  });

  console.log("[Scheduler] Cron jobs successfully registered.");
}
