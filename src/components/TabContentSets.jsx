import React from 'react';
import { FaBullseye, FaCalculator, FaWater, FaMountain, FaTree, FaWind, FaGolfBall, FaFire } from 'react-icons/fa';
import { TbGolf, TbTarget } from 'react-icons/tb';

// Helper function to get content based on tab
export const getTabContent = (tabId) => {
  switch (tabId) {
    case 'shots':
      return getShotContent();
    case 'calculator':
      return getDistanceContent();
    case 'putting':
      return getPuttingContent();
    case 'learn':
      return getLearnContent();
    default:
      return [];
  }
};

// Helper function to render icons
const renderIcon = (iconName, className = "text-6xl mx-auto mb-4") => {
  const iconMapping = {
    uphill: FaMountain,
    downhill: FaWater,
    sand: FaTree,
    trees: FaTree,
    target: TbTarget,
    withWind: FaWind,
    putting: FaGolfBall,
    golf: FaGolfBall
  };
  
  const IconComponent = iconMapping[iconName];
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  return <span className={className}>{iconName}</span>;
};

// Comprehensive shot data with all shot types
const comprehensiveShotData = [
  // LIES CATEGORY
  { id: 1, name: "Uphill Lie", category: "lies", quickTip: "Club up, swing with slope", situation: "Ball above your feet on upslope", keyAction: "Swing up the hill", icon: "uphill", difficulty: "Medium", clubAdjustment: "+1 club", ballPosition: "Forward in stance", stance: "Wider, perpendicular to slope", swingThoughts: ["Swing up the hill", "Stay balanced", "Finish high"], memorableQuote: "Think of the slope as your launch pad - swing with the hill, not against it.", proTip: "The ball will fly higher and shorter than normal", whenToUse: "When your ball is on an upslope and you need to match the slope angle. Ball will fly higher and shorter, so club up. Better than fighting the slope or trying to swing level." },
  { id: 2, name: "Downhill Lie", category: "lies", quickTip: "Club down, follow slope", situation: "Ball below your feet on downslope", keyAction: "Swing down the hill", icon: "downhill", difficulty: "Hard", clubAdjustment: "-1 club", ballPosition: "Back in stance", stance: "Narrow, weight forward", swingThoughts: ["Follow the slope", "Stay down", "Weight forward"], memorableQuote: "Ski down the mountain - stay with the slope and don't fight gravity.", proTip: "Ball will fly lower and farther than normal", whenToUse: "When your ball is on a downslope. Ball will fly lower and farther, so club down. Critical to follow the slope rather than trying to help the ball up." },
  { id: 3, name: "Ball Above Feet", category: "lies", quickTip: "Choke down, aim right", situation: "Standing below ball on sidehill", keyAction: "Grip down on club", icon: "uphill", difficulty: "Medium", clubAdjustment: "Choke down 1-2 inches", ballPosition: "Center of stance", stance: "More upright", swingThoughts: ["Ball will draw", "Aim right", "Swing easy"], memorableQuote: "Ball above feet wants to go left - aim right and let it happen.", proTip: "Choke down on the club to maintain control", whenToUse: "When you're standing below the ball on a sidehill. Ball will naturally draw left, so aim right of target and let physics work. Don't fight the natural ball flight." },
  { id: 4, name: "Ball Below Feet", category: "lies", quickTip: "Bend more, aim left", situation: "Standing above ball on sidehill", keyAction: "Bend more at waist", icon: "downhill", difficulty: "Hard", clubAdjustment: "Use longer club", ballPosition: "Center of stance", stance: "Bend more at waist", swingThoughts: ["Ball will fade", "Aim left", "Stay down"], memorableQuote: "Ball below feet wants to go right - aim left and stay down through the shot.", proTip: "Take an extra club and swing easier for better balance", whenToUse: "When you're standing above the ball on a sidehill. Ball will naturally fade right, so aim left of target. Hardest lie - take extra club and swing easier for balance." },
  
  // BUNKER CATEGORY
  { id: 5, name: "Fairway Bunker", category: "bunker", quickTip: "Ball first contact", situation: "Good lie in fairway bunker", keyAction: "Hit ball before sand", icon: "sand", difficulty: "Medium", clubAdjustment: "+1 club", ballPosition: "Slightly back", stance: "Firm footing, quiet lower body", swingThoughts: ["Ball first", "Stay tall", "Smooth swing"], memorableQuote: "Fairway bunkers are about clean contact - ball first, sand second.", proTip: "Take one more club and swing easier", whenToUse: "When you have a good lie and need distance from fairway bunker. Choose this technique when the lip is low enough to clear and you need to advance the ball toward the green (vs. just punching out)." },
  { id: 6, name: "Greenside Bunker", category: "bunker", quickTip: "Hit sand behind ball", situation: "Short bunker shot to green", keyAction: "Open face, hit sand", icon: "sand", difficulty: "Medium", clubAdjustment: "Sand wedge, open face", ballPosition: "Forward in stance", stance: "Open stance, weight left", swingThoughts: ["Hit sand first", "Follow through", "Accelerate"], memorableQuote: "Let the sand carry the ball out - you're hitting a sand shot, not a ball shot.", proTip: "Open the face and swing along your stance line", whenToUse: "Your standard greenside bunker shot when you have normal lie and moderate distance to pin. Use instead of deep bunker technique when lip is manageable and you want normal trajectory." },
  { id: 7, name: "Deep Bunker", category: "bunker", quickTip: "Steep swing, more sand", situation: "High lip bunker", keyAction: "Steep angle of attack", icon: "sand", difficulty: "Hard", clubAdjustment: "High lofted wedge", ballPosition: "Forward", stance: "Very open", swingThoughts: ["Swing steep", "Hit more sand", "High finish"], memorableQuote: "In deep bunkers, you need to go up before you go out.", proTip: "Take more sand and swing harder than normal", whenToUse: "When you're in a deep bunker with a high lip that requires maximum height. Getting out is priority #1 - distance is secondary. Use instead of normal bunker shot when escape angle is critical." },
  { id: 8, name: "Wet Sand Bunker", category: "bunker", quickTip: "Less sand, firm swing", situation: "Bunker after rain", keyAction: "Take less sand", icon: "sand", difficulty: "Medium", clubAdjustment: "Square clubface", ballPosition: "Center", stance: "Normal", swingThoughts: ["Less sand", "Firm contact", "Normal swing"], memorableQuote: "Wet sand is firm - treat it more like hardpan than loose sand.", proTip: "Square the face and take less sand than normal", whenToUse: "When sand is wet/firm from rain or morning dew. Wet sand acts more like hardpan, so adjust technique from normal fluffy sand conditions. Square face and take less sand." },
  
  // TROUBLE CATEGORY
  { id: 9, name: "Trees/Obstacles", category: "trouble", quickTip: "Punch out safely", situation: "Behind trees or obstacles", keyAction: "Punch out to safety", icon: "trees", difficulty: "Easy", clubAdjustment: "Lower lofted club", ballPosition: "Back in stance", stance: "Narrow", swingThoughts: ["Safety first", "Low trajectory", "Get out"], memorableQuote: "Trees are 90% air, but always plan for the 10% that isn't.", proTip: "Take your medicine - get back to the fairway", whenToUse: "When your ball is behind trees or obstacles and advancing toward target risks a worse situation. Course management 101 - take a sure bogey over a potential big number." },
  { id: 10, name: "Low Punch Shot", category: "trouble", quickTip: "Ball back, hands forward", situation: "Under trees or in wind", keyAction: "Keep ball flight low", icon: "trees", difficulty: "Medium", clubAdjustment: "-2 clubs", ballPosition: "Way back", stance: "Hands forward", swingThoughts: ["Ball back", "Hands forward", "Punch down"], memorableQuote: "When you need to go low, think punch - not swing.", proTip: "Ball back, hands forward, abbreviated follow-through", whenToUse: "When you need to keep ball flight low under tree branches or in strong wind. Choose this over regular swing when height is your enemy. Also great for windy conditions to keep ball penetrating." },
  
  // WIND CATEGORY
  { id: 11, name: "Into the Wind", category: "wind", quickTip: "Club up, swing easy", situation: "Strong headwind", keyAction: "Take more club, swing easier", icon: "withWind", difficulty: "Medium", clubAdjustment: "+2-3 clubs", ballPosition: "Back in stance", stance: "Narrow, weight forward", swingThoughts: ["Club up", "Swing easy", "Low follow through"], memorableQuote: "When it's breezy, swing easy - let the club do the work.", proTip: "Take two extra clubs and swing at 80% power", whenToUse: "When facing 15+ mph headwind. Wind kills distance exponentially - better to swing easy with more club than swing hard into wind. Critical for approach shots and long irons." },
  { id: 12, name: "With the Wind", category: "wind", quickTip: "Club down, full swing", situation: "Strong tailwind", keyAction: "Take less club", icon: "withWind", difficulty: "Easy", clubAdjustment: "-1-2 clubs", ballPosition: "Forward", stance: "Normal", swingThoughts: ["Club down", "Normal swing", "Let wind help"], memorableQuote: "Tailwinds are free distance - don't fight the gift.", proTip: "Take one less club and trust the wind", whenToUse: "When you have helping wind of 10+ mph. Free distance opportunity - take less club and let wind carry the ball. Watch out for over-clubbing and flying greens." },
  { id: 13, name: "Crosswind Left to Right", category: "wind", quickTip: "Aim left, allow for drift", situation: "Wind blowing left to right", keyAction: "Aim into the wind", icon: "withWind", difficulty: "Medium", clubAdjustment: "Normal club", ballPosition: "Normal", stance: "Aim left", swingThoughts: ["Aim left", "Normal swing", "Let wind work"], memorableQuote: "Crosswinds require trust - aim into it and let physics do the rest.", proTip: "Aim directly at the wind source and let it blow the ball to target", whenToUse: "When wind is blowing 10+ mph from left to right. Aim into the wind and let it drift ball to target. More predictable than trying to fight crosswind with shot shape." },
  { id: 14, name: "Crosswind Right to Left", category: "wind", quickTip: "Aim right, allow for drift", situation: "Wind blowing right to left", keyAction: "Aim into the wind", icon: "withWind", difficulty: "Medium", clubAdjustment: "Normal club", ballPosition: "Normal", stance: "Aim right", swingThoughts: ["Aim right", "Normal swing", "Let wind work"], memorableQuote: "Trust the wind - it's more consistent than you think.", proTip: "Aim into the wind and let it bring the ball back", whenToUse: "When wind is blowing 10+ mph from right to left. Aim into the wind and let it bring ball back to target. Trust physics over trying to manipulate ball flight against wind." },
  
  // SHOTS CATEGORY
  { id: 15, name: "Fade Shot", category: "shots", quickTip: "Open stance, outside-in swing", situation: "Need ball to curve left to right", keyAction: "Cut across the ball", icon: "target", difficulty: "Medium", clubAdjustment: "+1 club", ballPosition: "Slightly forward", stance: "Open stance", swingThoughts: ["Outside-in", "Hold face open", "Swing left"], memorableQuote: "A controlled fade is a golfer's best friend - reliable and predictable.", proTip: "Open stance and swing along your body line", whenToUse: "When pin is on the right side, to avoid left trouble (water, trees), when you need the ball to land softer and stop quicker, or as your go-to 'safe' shot shape. More reliable than draws for most golfers." },
  { id: 16, name: "Draw Shot", category: "shots", quickTip: "Closed stance, inside-out swing", situation: "Need ball to curve right to left", keyAction: "Swing from inside", icon: "target", difficulty: "Hard", clubAdjustment: "Normal club", ballPosition: "Slightly back", stance: "Closed stance", swingThoughts: ["Inside-out", "Release hands", "Swing right"], memorableQuote: "A draw adds distance and roll - the power shot of choice.", proTip: "Close stance and swing out to the right", whenToUse: "When you need extra distance (10-15 yards more than fade), pin is on left side, avoiding right-side trouble, or when playing into wind (draw penetrates better). Higher risk but higher reward than fade." },
  { id: 17, name: "Flop Shot", category: "shots", quickTip: "Open face, steep swing", situation: "Short distance over obstacle", keyAction: "Hit down steeply", icon: "target", difficulty: "Expert", clubAdjustment: "60° wedge", ballPosition: "Forward", stance: "Very open", swingThoughts: ["Open face wide", "Steep swing", "Accelerate through"], memorableQuote: "The flop shot is high risk, high reward - commit or don't try it.", proTip: "Practice this shot extensively before using on course", whenToUse: "When you have no green to work with - tight pin, bunker in front, or need to fly it close and stop quickly. Only use if you're confident - otherwise play safer bump and run or pitch." },
  { id: 18, name: "Bump and Run", category: "shots", quickTip: "Low loft, chip motion", situation: "Lots of green to work with", keyAction: "Chip with low lofted club", icon: "target", difficulty: "Easy", clubAdjustment: "7-9 iron", ballPosition: "Back", stance: "Narrow, weight left", swingThoughts: ["Chip motion", "Let it roll", "Target landing spot"], memorableQuote: "The bump and run is the most reliable shot around the green.", proTip: "Use a 7 or 8 iron and treat it like a long putt", whenToUse: "When you have plenty of green between you and the pin. Choose this over pitch/flop shots when the pin is back, green is firm, or you want the lowest-risk option around the green." },
  
  // SHORT GAME CATEGORY
  { id: 19, name: "Pitch Shot", category: "short", quickTip: "Pitching wedge, medium trajectory", situation: "30-60 yards to pin", keyAction: "Three-quarter swing", icon: "putting", difficulty: "Medium", clubAdjustment: "Pitching wedge", ballPosition: "Center", stance: "Narrow", swingThoughts: ["Smooth tempo", "Accelerate through", "High finish"], memorableQuote: "Pitching is about rhythm - find your tempo and trust it.", proTip: "Focus on tempo rather than power", whenToUse: "Your go-to shot from 30-60 yards when you need medium height and spin. Choose over flop shot when you don't need maximum height, choose over bump-and-run when you need the ball to stop quickly." },
  { id: 20, name: "Chip Shot", category: "short", quickTip: "Short backswing, firm through", situation: "Just off the green", keyAction: "Putting motion with loft", icon: "putting", difficulty: "Easy", clubAdjustment: "Sand or gap wedge", ballPosition: "Back", stance: "Weight left", swingThoughts: ["Short backswing", "Firm through", "Follow low"], memorableQuote: "Chipping is putting with a wedge - same motion, different club.", proTip: "Keep wrists firm and think putting stroke", whenToUse: "When you're just off the green edge with some fringe to carry. Choose this over putting when you need to get over fringe/rough, choose over pitch shot when you're close to green." }
];

// Convert shot data to page curl format
const createShotPage = (shot, index) => {
  const colors = ['amber', 'blue', 'green', 'purple', 'orange'];
  const colorClass = `page-curl-content-${colors[index % colors.length]}`;
  
  return {
    id: shot.id,
    title: shot.name.toUpperCase(),
    content: (
      <div className={`page-curl-content ${colorClass}`}>
        <div className="page-curl-texture">
          <div className={`coffee-stain coffee-stain-${(index % 6) + 1}`}></div>
        </div>
        
        <div className="page-curl-scrollable">
          {/* HERO SECTION - Clean, prominent shot identification */}
          <div className="shot-hero mb-8">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{shot.name}</h1>
                <p className="text-gray-600 text-base leading-relaxed">{shot.situation}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {renderIcon(shot.icon, "w-8 h-8 text-gray-500")}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  shot.difficulty === "Easy" ? "bg-emerald-100 text-emerald-700" :
                  shot.difficulty === "Medium" ? "bg-amber-100 text-amber-700" :
                  shot.difficulty === "Hard" ? "bg-red-100 text-red-700" :
                  "bg-purple-100 text-purple-700"
                }`}>
                  {shot.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* STRATEGIC CONTEXT - Most important for decision-making */}
          {shot.whenToUse && (
            <div className="strategy-card mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🎯</span>
                  </div>
                  <h3 className="font-semibold text-blue-900">When to Use</h3>
                </div>
                <p className="text-blue-800 leading-relaxed">{shot.whenToUse}</p>
              </div>
            </div>
          )}

          {/* SETUP GRID - Clean technical specifications */}
          <div className="setup-section mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Setup & Execution</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="setup-card bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500 mb-1">Key Action</div>
                <div className="text-gray-900 font-medium">{shot.keyAction}</div>
              </div>
              <div className="setup-card bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500 mb-1">Club</div>
                <div className="text-gray-900 font-medium">{shot.clubAdjustment}</div>
              </div>
              <div className="setup-card bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500 mb-1">Ball Position</div>
                <div className="text-gray-900 font-medium">{shot.ballPosition}</div>
              </div>
              <div className="setup-card bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500 mb-1">Stance</div>
                <div className="text-gray-900 font-medium">{shot.stance}</div>
              </div>
            </div>
          </div>

          {/* SWING THOUGHTS - Mental game */}
          <div className="thoughts-section mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Swing Thoughts</h3>
            <div className="flex flex-wrap gap-2">
              {shot.swingThoughts?.map((thought, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium border">
                  {thought}
                </span>
              ))}
            </div>
          </div>

          {/* MEMORY AIDS - Quotes and tips */}
          <div className="memory-section space-y-4">
            <div className="memory-card bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-600 text-sm">💭</span>
                </div>
                <div>
                  <div className="text-amber-800 font-medium italic leading-relaxed">"{shot.memorableQuote}"</div>
                </div>
              </div>
            </div>
            
            <div className="memory-card bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">⛳</span>
                </div>
                <div>
                  <div className="text-green-800 font-medium leading-relaxed">{shot.proTip}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
};

// Shot selection content - flip through ALL shot types
const getShotContent = () => [
  {
    id: 0,
    title: 'Golf Shot Guide',
    content: (
      <div className="page-curl-content page-curl-content-intro">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-1"></div>
        </div>
        
        <div className="page-curl-body flex flex-col items-center justify-center h-full text-center">
          <div className="app-logo mb-8">
            <TbGolf className="text-8xl text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Golf Shot Guide</h1>
            <p className="text-lg text-slate-600">Professional Shot Selection</p>
          </div>
          
          <div className="intro-stats grid grid-cols-2 gap-6 mt-8">
            <div className="stat-item">
              <div className="text-2xl font-bold text-green-600">{comprehensiveShotData.length}</div>
              <div className="text-sm text-slate-600">Shot Types</div>
            </div>
            <div className="stat-item">
              <div className="text-2xl font-bold text-blue-600">Pro</div>
              <div className="text-sm text-slate-600">Techniques</div>
            </div>
          </div>
          
          <div className="intro-hint mt-12 text-center">
            <div className="text-gray-500 text-sm">Swipe up to begin →</div>
          </div>
        </div>
      </div>
    )
  },
  // Add all comprehensive shot data as page curl content
  ...comprehensiveShotData.map((shot, index) => createShotPage(shot, index))
];

// Distance calculation content
const getDistanceContent = () => [
  {
    id: 0,
    title: 'Distance Calculator',
    content: (
      <div className="page-curl-content page-curl-content-intro">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-2"></div>
        </div>
        
        <div className="page-curl-body flex flex-col items-center justify-center h-full text-center">
          <div className="app-logo mb-8">
            <FaCalculator className="text-8xl text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Distance Calculator</h1>
            <p className="text-lg text-slate-600">Precision Yardage Planning</p>
          </div>
          
          <div className="intro-stats grid grid-cols-2 gap-6 mt-8">
            <div className="stat-item">
              <div className="text-2xl font-bold text-blue-600">GPS</div>
              <div className="text-sm text-slate-600">Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="text-2xl font-bold text-green-600">Smart</div>
              <div className="text-sm text-slate-600">Calculations</div>
            </div>
          </div>
          
          <div className="intro-hint mt-12 text-center">
            <div className="text-gray-500 text-sm">Swipe up for calculations →</div>
          </div>
        </div>
      </div>
    )
  }
];

// Putting techniques data - structured like shots
const puttingTechniques = [
  { id: 1, name: "Straight Putt", category: "fundamental", quickTip: "Square face, smooth stroke", situation: "Ball directly in line with hole", keyAction: "Keep putter face square", icon: "putting", difficulty: "Easy", clubAdjustment: "Putter", ballPosition: "Eyes over ball", stance: "Shoulder-width, parallel to target", swingThoughts: ["Pendulum motion", "Equal back and through", "Head still"], memorableQuote: "Straight putts are about trust - trust your read, trust your stroke, trust the ball to go in.", proTip: "Use alignment sticks to check square face", whenToUse: "When ball is directly in line with hole with minimal break. Perfect for practicing fundamentals and building confidence. Choose this read when green appears flat between ball and hole." },
  { id: 2, name: "Uphill Putt", category: "slope", quickTip: "Hit it firmer, less break", situation: "Putting uphill to the hole", keyAction: "Add speed for slope", icon: "uphill", difficulty: "Medium", clubAdjustment: "Firmer stroke", ballPosition: "Slightly more forward", stance: "Firm stance for stability", swingThoughts: ["Firmer stroke", "Ball will slow down", "Trust the line"], memorableQuote: "Uphill putts are like running uphill - you need more energy to get there.", proTip: "Practice with tees to feel uphill resistance", whenToUse: "When putting uphill to hole. Ball will slow down quickly due to gravity. Play less break than flat putt since speed keeps ball straighter. Never leave uphill putts short." },
  { id: 3, name: "Downhill Putt", category: "slope", quickTip: "Gentle touch, more break", situation: "Putting downhill to the hole", keyAction: "Control speed carefully", icon: "downhill", difficulty: "Hard", clubAdjustment: "Gentler stroke", ballPosition: "Ball slightly back", stance: "Lighter grip pressure", swingThoughts: ["Shorter backstroke", "Gentle follow-through", "Speed control"], memorableQuote: "Downhill putts are like rolling a ball down a hill - let the slope do the work.", proTip: "Practice with different slopes to feel speed control", whenToUse: "When putting downhill to hole. Most challenging putt - requires perfect speed control. Play more break since slower speed allows gravity to move ball more. Death putts if you're not careful." },
  { id: 4, name: "Breaking Putt", category: "reading", quickTip: "Read the slope, trust your line", situation: "Green has significant slope between ball and hole", keyAction: "Pick line and commit", icon: "withWind", difficulty: "Hard", clubAdjustment: "Speed determines break", ballPosition: "Square to start line", stance: "Aim at apex point", swingThoughts: ["Trust your read", "Smooth stroke on line", "Speed controls break"], memorableQuote: "Never up, never in - but on breaking putts, the right line beats pure speed every time.", proTip: "Walk around putt to see break from multiple angles", whenToUse: "When green has visible slope between ball and hole. Most common putt on course. Speed determines how much ball breaks - faster = less break, slower = more break. Commit to your read." },
  { id: 5, name: "Long Lag Putt", category: "distance", quickTip: "Focus on speed over line", situation: "Long putts (20+ feet) where goal is getting close", keyAction: "Distance control priority", icon: "target", difficulty: "Medium", clubAdjustment: "Longer stroke", ballPosition: "Eyes over ball", stance: "Wider stance for stability", swingThoughts: ["Smooth rhythm", "Think rolling to hole", "Speed over precision"], memorableQuote: "Lag putting is like throwing darts - get it in the neighborhood and clean up.", proTip: "Practice to 3-foot circle around hole", whenToUse: "From 20+ feet where making it is bonus, not expectation. Goal is two-putt territory. Focus 80% on speed, 20% on line. Better to be hole-high and 3 feet right than pin-high and 6 feet short." },
  { id: 6, name: "Short Pressure Putt", category: "pressure", quickTip: "Routine and commitment", situation: "3-6 foot putts that matter", keyAction: "Trust your routine", icon: "putting", difficulty: "Hard", clubAdjustment: "Normal stroke", ballPosition: "Eyes over ball", stance: "Comfortable, repeatable", swingThoughts: ["Same routine", "Accelerate through", "See it go in"], memorableQuote: "Short putts are made before you stand over them - in your mind and your routine.", proTip: "Never change routine under pressure", whenToUse: "The 'must-make' putts from short range. More about mental game than technique. Stick to exact same routine you use in practice. These putts win and lose rounds." }
];

// Convert putting data to page curl format using the same structure as shots
const createPuttingPage = (putt, index) => {
  const colors = ['green', 'blue', 'amber', 'purple', 'orange'];
  const colorClass = `page-curl-content-${colors[index % colors.length]}`;
  
  return {
    id: putt.id,
    title: putt.name.toUpperCase(),
    content: (
      <div className={`page-curl-content ${colorClass}`}>
        <div className="page-curl-texture">
          <div className={`coffee-stain coffee-stain-${(index % 6) + 1}`}></div>
        </div>
        
        <div className="page-curl-scrollable">
          {/* HERO SECTION - Clean, prominent putt identification */}
          <div className="shot-hero mb-8">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">{putt.name}</h1>
                <p className="text-gray-600 text-base leading-relaxed">{putt.situation}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {renderIcon(putt.icon, "w-8 h-8 text-gray-500")}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  putt.difficulty === "Easy" ? "bg-emerald-100 text-emerald-700" :
                  putt.difficulty === "Medium" ? "bg-amber-100 text-amber-700" :
                  putt.difficulty === "Hard" ? "bg-red-100 text-red-700" :
                  "bg-purple-100 text-purple-700"
                }`}>
                  {putt.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* STRATEGIC CONTEXT - Most important for decision-making */}
          {putt.whenToUse && (
            <div className="strategy-card mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">🎯</span>
                  </div>
                  <h3 className="font-semibold text-blue-900">When to Use</h3>
                </div>
                <p className="text-blue-800 leading-relaxed">{putt.whenToUse}</p>
              </div>
            </div>
          )}

          {/* SETUP GRID - Clean technical specifications */}
          <div className="setup-section mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Setup & Execution</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="setup-card bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500 mb-1">Key Action</div>
                <div className="text-gray-900 font-medium">{putt.keyAction}</div>
              </div>
              <div className="setup-card bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500 mb-1">Stroke</div>
                <div className="text-gray-900 font-medium">{putt.clubAdjustment}</div>
              </div>
              <div className="setup-card bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500 mb-1">Ball Position</div>
                <div className="text-gray-900 font-medium">{putt.ballPosition}</div>
              </div>
              <div className="setup-card bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-500 mb-1">Stance</div>
                <div className="text-gray-900 font-medium">{putt.stance}</div>
              </div>
            </div>
          </div>

          {/* SWING THOUGHTS - Mental game */}
          <div className="thoughts-section mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Thoughts</h3>
            <div className="flex flex-wrap gap-2">
              {putt.swingThoughts?.map((thought, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm font-medium border">
                  {thought}
                </span>
              ))}
            </div>
          </div>

          {/* MEMORY AIDS - Quotes and tips */}
          <div className="memory-section space-y-4">
            <div className="memory-card bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-600 text-sm">💭</span>
                </div>
                <div>
                  <div className="text-amber-800 font-medium italic leading-relaxed">"{putt.memorableQuote}"</div>
                </div>
              </div>
            </div>
            
            <div className="memory-card bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">⛳</span>
                </div>
                <div>
                  <div className="text-green-700 font-medium text-sm">Pro Tip</div>
                  <div className="text-green-800 leading-relaxed">{putt.proTip}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };
};

// Putting content with proper structure
const getPuttingContent = () => [
  {
    id: 0,
    title: 'Putting Mastery',
    content: (
      <div className="page-curl-content page-curl-content-intro">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-3"></div>
        </div>
        
        <div className="page-curl-body flex flex-col items-center justify-center h-full text-center">
          <div className="app-logo mb-8">
            <FaGolfBall className="text-8xl text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Putting Mastery</h1>
            <p className="text-lg text-slate-600">"Drive for show, putt for dough"</p>
          </div>
          
          <div className="intro-stats grid grid-cols-2 gap-6 mt-8">
            <div className="stat-item">
              <div className="text-2xl font-bold text-green-600">Read</div>
              <div className="text-sm text-slate-600">The Break</div>
            </div>
            <div className="stat-item">
              <div className="text-2xl font-bold text-blue-600">Speed</div>
              <div className="text-sm text-slate-600">Control</div>
            </div>
          </div>
          
          <div className="intro-hint mt-12 text-center">
            <div className="text-gray-500 text-sm">Swipe up for techniques →</div>
          </div>
        </div>
      </div>
    )
  },
  ...puttingTechniques.map((putt, index) => createPuttingPage(putt, index))
];

// Learn content
const getLearnContent = () => [
  {
    id: 0,
    title: 'Golf Learning Center',
    content: (
      <div className="page-curl-content page-curl-content-intro">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-4"></div>
        </div>
        
        <div className="page-curl-body flex flex-col items-center justify-center h-full text-center">
          <div className="app-logo mb-8">
            <TbGolf className="text-8xl text-purple-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Learn Golf</h1>
            <p className="text-lg text-slate-600">Master the Fundamentals</p>
          </div>
          
          <div className="intro-stats grid grid-cols-2 gap-6 mt-8">
            <div className="stat-item">
              <div className="text-2xl font-bold text-purple-600">Tips</div>
              <div className="text-sm text-slate-600">From Pros</div>
            </div>
            <div className="stat-item">
              <div className="text-2xl font-bold text-blue-600">Skills</div>
              <div className="text-sm text-slate-600">Development</div>
            </div>
          </div>
          
          <div className="intro-hint mt-12 text-center">
            <div className="text-gray-500 text-sm">Swipe up to learn →</div>
          </div>
        </div>
      </div>
    )
  }
];