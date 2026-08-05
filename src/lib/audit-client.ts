export async function logAudit(params: {
  type: 'impersonation' | 'pii' | 'billing' | 'account';
  action: string;
  tenant?: string;
  reason?: string;
}) {
  try {
    await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: params.type,
        action: params.action,
        tenant: params.tenant ?? '',
        reason: params.reason ?? '',
      }),
    });
  } catch {
    // Non-fatal — never block the UI on a failed audit write
  }
}
