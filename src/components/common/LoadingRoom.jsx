export default function LoadingRoom() {
  return (
    <>
      <section className="roomcard-container">
        <div class="mx-10 my-10 rounded-md p-4 shadow-md md:mx-80">
          <div class="flex animate-pulse space-x-4">
            <div class="h-12 w-12 rounded-md bg-slate-200 md:h-32 md:w-32"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="h-3 rounded bg-slate-200"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4 md:grid-cols-3">
                  <div class="col-span-2 h-3 rounded bg-slate-200"></div>
                  <div class="col-span-1 h-3 rounded bg-slate-200"></div>
                </div>
                <div class="h-3 rounded bg-slate-200"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
