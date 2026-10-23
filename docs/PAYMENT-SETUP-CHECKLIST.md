# Payment Provider Setup & Verification Checklist
A method may be shown as ACTIVE only when every box for it is checked and signed by a Foundation Administrator.

## All providers
- [ ] Legal entity + charitable fundraising acceptance confirmed by the provider
- [ ] Merchant account approved; settlement bank account verified
- [ ] Supported currencies confirmed; refund + recurring support confirmed in writing
- [ ] Sandbox credentials in server env (never in code/chat); sandbox end-to-end test passed
- [ ] Webhook endpoint registered; signing secret stored; duplicate-event test passed
- [ ] Production credentials rotated in; first live micro-donation reconciled

## Visa / Mastercard (card processor)
- Processor candidates: Stripe (no direct Ethiopia onboarding — eligibility UNVERIFIED),
  Flutterwave, DPO Pay, Pesapal, or a local acquiring bank. Decision required from the foundation.
- [ ] 3-D Secure enabled · tokenized/hosted checkout only · no card data touches our servers (PCI SAQ-A path)

## Apple Pay / Google Pay
- [ ] Ride on the approved card processor · merchant ID + domain verification completed
- [ ] Tested on a real supported device/browser

## WeChat Pay
- [ ] Via card processor or direct contract · QR / in-app flow confirmed for target donor countries

## Ethiopian methods (Telebirr · CBE Birr · ArifPay · HelloCash)
- [ ] Merchant agreement signed with the operator · API credentials + callback IPs whitelisted
- [ ] Settlement + reconciliation report format confirmed
