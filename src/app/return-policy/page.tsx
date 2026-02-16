export default function ReturnPolicyPage() {
  return (
    <>
      {/* Header Section */}
      <section className="relative bg-muted py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl font-semibold text-primary mb-4">
            Return Policy
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground">
           Our return policy allows refunds for eligible courses. Cancellations made within the specified period qualify for a full refund. Late cancellations may incur fees or restrictions.
          </p>
        </div>
      </section>

      {/* Content Card Section */}
<section className="pt-10 pb-20">

        <div className="container mx-auto px-4">
<div className="mx-auto max-w-3xl bg-background rounded-xl shadow-md px-10 pt-6 pb-10">

          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
  Last updated January 01, 2026
</p>

            <div className="space-y-8 text-sm leading-relaxed">
              <div>
                <p className="font-semibold mb-2">Refund</p>
                <p>
                  All sales are final and no refund will be issued.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-2">Questions</p>
                <p>
                  If you have any questions concerning our return policy, please
                  get in touch with us at info@paarshelearning.com.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
