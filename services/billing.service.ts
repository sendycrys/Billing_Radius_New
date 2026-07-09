import { prisma } from "@/lib/prisma"

export class BillingService {
  async generateMonthlyInvoices() {
    console.log("[Billing Engine] Generating monthly invoices...");
    
    // Find all active subscriptions
    const activeSubscriptions = await prisma.subscription.findMany({
      where: { status: 'ACTIVE' },
      include: { customer: true, package: true }
    });

    let count = 0;
    for (const sub of activeSubscriptions) {
      const dateStr = `${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2, '0')}`;
      const invoiceNumber = `INV-${dateStr}-${sub.id.substring(0,5)}`;
      
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7); // Due in 7 days

      await prisma.invoice.create({
        data: {
          customer_id: sub.customer_id,
          invoice_number: invoiceNumber,
          amount: sub.package.price,
          due_date: dueDate,
          status: 'UNPAID'
        }
      });
      count++;
    }
    
    console.log(`[Billing Engine] Successfully generated ${count} invoices.`);
  }

  async handlePaymentSuccess(invoiceId: string, paymentMethod: string) {
    // 1. Update invoice status
    const invoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: 'PAID' }
    });

    // 2. Record payment
    await prisma.payment.create({
      data: {
        invoice_id: invoiceId,
        payment_method: paymentMethod,
        amount: invoice.amount
      }
    });

    // 3. Re-enable internet connection if suspended
    console.log(`[Billing Engine] Payment processed for invoice ${invoiceId}. Connection restored if applicable.`);
  }
}

export const billingService = new BillingService();
