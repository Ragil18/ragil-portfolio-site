import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Mail,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function RoiCalculator() {
  const [reportsCount, setReportsCount] = useState<number>(12);
  const [hoursPerReport, setHoursPerReport] = useState<number>(3.5);
  const [hourlyRate, setHourlyRate] = useState<number>(50);

  // Math models based on Ragil's proven 80% report automation benchmark at Neuberg & DAC
  const weeklyHoursSpent = reportsCount * hoursPerReport;
  const annualHoursSpent = weeklyHoursSpent * 52;
  const annualCostSpent = annualHoursSpent * hourlyRate;

  const annualHoursSaved = Math.round(annualHoursSpent * 0.8);
  const annualCostSaved = Math.round(annualCostSpent * 0.8);
  const hoursRemaining = annualHoursSpent - annualHoursSaved;

  const handleConsultClick = () => {
    const subject = encodeURIComponent(`Inquiry: Automation ROI Projection (${reportsCount} reports/wk)`);
    const body = encodeURIComponent(
      `Hi Ragil,\n\nI tested your portfolio Automation ROI Calculator with our team's estimates:\n- Weekly Reports: ${reportsCount}\n- Manual Hours per Report: ${hoursPerReport} hrs\n- Estimated Annual Savings: $${annualCostSaved.toLocaleString()} (${annualHoursSaved} hours saved)\n\nWe would like to discuss implementing an automation pipeline for our data workflows.\n\nBest regards,`
    );
    window.location.href = `mailto:ragilimmanuvel@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-[#040913] p-4 sm:p-8 shadow-2xl relative overflow-hidden font-mono">
      {/* Ambient background glow */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, #10b981 0%, transparent 70%)"
        }}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-emerald-500/20 pb-4 sm:pb-5 mb-5 sm:mb-6">
        <div>
          <span className="text-[11px] sm:text-xs text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold mb-1">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            ENTERPRISE AUTOMATION ROI CALCULATOR
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white font-mono">
            Calculate Your Organization's Savings
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl font-sans">
            Based on Ragil's verified track record of <strong>80% recurring report automation</strong> and automated AI pipelines at Neuberg Diagnostics and DAC Developers.
          </p>
        </div>

        <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-[11px] sm:text-xs flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>PROVEN 80% EFFICIENCY BENCHMARK</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ─── Sliders Input Column (5 cols) ─── */}
        <div className="lg:col-span-5 space-y-6">
          {/* Slider 1: Weekly Reports */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold">1. Recurring Reports Built Weekly</span>
              <span className="text-emerald-400 font-bold text-sm bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                {reportsCount} reports
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={40}
              step={1}
              value={reportsCount}
              onChange={(e) => setReportsCount(Number(e.target.value))}
              className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>2 min</span>
              <span>20 avg</span>
              <span>40 max</span>
            </div>
          </div>

          {/* Slider 2: Hours per report */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold">2. Manual Prep Hours per Report</span>
              <span className="text-emerald-400 font-bold text-sm bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                {hoursPerReport} hrs/report
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={0.5}
              value={hoursPerReport}
              onChange={(e) => setHoursPerReport(Number(e.target.value))}
              className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1 hr</span>
              <span>5 hrs</span>
              <span>10 hrs</span>
            </div>
          </div>

          {/* Slider 3: Hourly Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-bold">3. Estimated Analyst / Labor Rate</span>
              <span className="text-emerald-400 font-bold text-sm bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                ${hourlyRate} / hr
              </span>
            </div>
            <input
              type="range"
              min={25}
              max={150}
              step={5}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-emerald-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>$25/hr</span>
              <span>$75/hr</span>
              <span>$150/hr</span>
            </div>
          </div>

          {/* Current State Summary */}
          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 text-xs text-slate-400 space-y-1">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              CURRENT MANUAL OVERHEAD:
            </div>
            <div className="flex justify-between">
              <span>Weekly manual hours:</span>
              <span className="text-white font-bold">{weeklyHoursSpent.toFixed(1)} hrs/wk</span>
            </div>
            <div className="flex justify-between">
              <span>Annual overhead cost:</span>
              <span className="text-red-400 font-bold">${annualCostSpent.toLocaleString()} / yr</span>
            </div>
          </div>
        </div>

        {/* ─── Projected Output Display Column (7 cols) ─── */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6 p-6 rounded-xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 to-[#040814] shadow-xl">
          <div>
            <div className="text-[11px] text-emerald-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              ANNUAL PROJECTED VALUE WITH RAGIL'S PIPELINE:
            </div>

            {/* Big Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl border border-emerald-400/50 bg-emerald-950/40">
                <span className="text-[10px] text-emerald-300 uppercase tracking-wider block">
                  ANNUAL CAPITAL SAVED
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-300 mt-1">
                  ${annualCostSaved.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-400/80 mt-1 block">
                  Direct operational overhead eliminated
                </span>
              </div>

              <div className="p-4 rounded-xl border border-cyan-400/50 bg-cyan-950/40">
                <span className="text-[10px] text-cyan-300 uppercase tracking-wider block">
                  STAFF HOURS RECLAIMED
                </span>
                <div className="text-3xl sm:text-4xl font-black text-cyan-300 mt-1">
                  {annualHoursSaved.toLocaleString()} hrs
                </div>
                <span className="text-[11px] text-cyan-400/80 mt-1 block">
                  Re-allocated to high-value strategic growth
                </span>
              </div>
            </div>

            {/* Visual Comparison Bar */}
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Annual Hours: Before vs. After Ragil's Automation</span>
                <span className="text-emerald-400 font-bold">-80% REDUCTION</span>
              </div>
              <div className="h-6 w-full bg-slate-900 rounded-lg overflow-hidden flex border border-slate-800">
                <div 
                  className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-bold text-black"
                  style={{ width: "80%" }}
                  title="Hours Automated (80%)"
                >
                  80% AUTOMATED ({annualHoursSaved} hrs)
                </div>
                <div 
                  className="bg-slate-700 h-full flex items-center justify-center text-[9px] text-slate-300"
                  style={{ width: "20%" }}
                  title="Hours Remaining (20%)"
                >
                  20%
                </div>
              </div>
            </div>

            {/* Additional Value Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Turnaround: Days → 15 Minutes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Eliminated Human Transcription Errors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Latency C-Suite Governance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated Anomaly & NPS Alerts</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <span className="text-xs text-slate-400 text-center sm:text-left">
              Ready to automate your organization's reporting pipeline?
            </span>
            <Button
              onClick={handleConsultClick}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs tracking-wider px-6 h-10 shadow-lg shadow-emerald-500/30 w-full sm:w-auto justify-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              IMPLEMENT THIS IN YOUR ORG
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
