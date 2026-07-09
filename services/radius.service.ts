import { prisma } from "@/lib/prisma"
import { mikrotik } from "@/lib/mikrotik"

export class RadiusService {
  async createUser(customerId: string, username: string, password: string, profile: string) {
    // 1. Create locally in billing DB
    const radiusUser = await prisma.radiusUser.create({
      data: { customer_id: customerId, username, password, profile }
    });

    // 2. Sync to radcheck (FreeRADIUS authentication)
    await prisma.radcheck.create({
      data: { username, attribute: "Cleartext-Password", op: "==", value: password }
    });

    // 3. Sync to radreply (FreeRADIUS profile/speed limit)
    // Here we can assign static IP or rate limits based on profile
    await prisma.radreply.create({
      data: { username, attribute: "Mikrotik-Rate-Limit", op: "=", value: "10M/10M" } 
    });

    // 4. Sync to Mikrotik RouterOS (Optional, if using PPPoE Secrets directly on NAS)
    await mikrotik.createPPPSecret(username, password, profile);

    return radiusUser;
  }

  async suspendUser(username: string) {
    console.log(`[Radius] Suspending user ${username}`);
    // Disable in radcheck by changing password or adding Auth-Type := Reject
    // Disconnect active session
    await mikrotik.disconnectUser(username);
    return true;
  }
}

export const radiusService = new RadiusService();
