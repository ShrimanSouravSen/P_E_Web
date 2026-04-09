export default function OrbitalDiagram() {
  return (
    <div className="orbit-3d-stage relative mx-auto aspect-square w-full max-w-[320px] -translate-x-4 overflow-hidden md:-translate-x-5 lg:translate-x-0">
      <div className="orbit-3d-scene absolute inset-2">
        <div className="ring-axis ring-x">
          <div className="ring-orbit">
            <div className="ring-trace" />
            <div className="ring-marker-orbit">
              <div className="ring-marker">
                <div className="ring-marker-highlight" />
              </div>
            </div>
          </div>
        </div>

        <div className="ring-axis ring-y">
          <div className="ring-orbit">
            <div className="ring-trace" />
            <div className="ring-marker-orbit">
              <div className="ring-marker">
                <div className="ring-marker-highlight" />
              </div>
            </div>
          </div>
        </div>

        <div className="ring-axis ring-mid">
          <div className="ring-orbit">
            <div className="ring-trace" />
            <div className="ring-marker-orbit">
              <div className="ring-marker">
                <div className="ring-marker-highlight" />
              </div>
            </div>
          </div>
        </div>

        <div className="reference-ring" />
        <div className="reference-nodes">
          <div className="reference-node-set reference-node-set-x">
            <div className="reference-node reference-node-axis-start">
              <div className="reference-node-highlight" />
              <span className="reference-node-label label-side-right">Power</span>
            </div>
            <div className="reference-node reference-node-axis-end">
              <div className="reference-node-highlight" />
              <span className="reference-node-label label-side-left">Infra</span>
            </div>
          </div>
          <div className="reference-node-set reference-node-set-y">
            <div className="reference-node reference-node-axis-start">
              <div className="reference-node-highlight" />
              <span className="reference-node-label label-side-left">EV Components</span>
            </div>
            <div className="reference-node reference-node-axis-end">
              <div className="reference-node-highlight" />
              <span className="reference-node-label label-side-right">Green</span>
            </div>
          </div>
          <div className="reference-node-set reference-node-set-mid">
            <div className="reference-node reference-node-horizontal-start">
              <div className="reference-node-highlight" />
              <span className="reference-node-label label-side-left">Cable</span>
            </div>
            <div className="reference-node reference-node-horizontal-end">
              <div className="reference-node-highlight" />
              <span className="reference-node-label label-side-right">Alloy</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="sphere-3d">
            <div className="sphere-highlight" />
            <div className="sphere-highlight-soft" />
          </div>
        </div>

      </div>


    </div>
  )
}
