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
  { id: 1, name: "Uphill Lie", category: "lies", quickTip: "Club up, swing with slope", situation: "Ball above your feet on upslope", keyAction: "Swing up the hill", icon: "uphill", difficulty: "Medium", clubAdjustment: "+1 club", ballPosition: "Forward in stance", stance: "Wider, perpendicular to slope", swingThoughts: ["Swing up the hill", "Stay balanced", "Finish high"], memorableQuote: "Think of the slope as your launch pad - swing with the hill, not against it.", proTip: "The ball will fly higher and shorter than normal" },
  { id: 2, name: "Downhill Lie", category: "lies", quickTip: "Club down, follow slope", situation: "Ball below your feet on downslope", keyAction: "Swing down the hill", icon: "downhill", difficulty: "Hard", clubAdjustment: "-1 club", ballPosition: "Back in stance", stance: "Narrow, weight forward", swingThoughts: ["Follow the slope", "Stay down", "Weight forward"], memorableQuote: "Ski down the mountain - stay with the slope and don't fight gravity.", proTip: "Ball will fly lower and farther than normal" },
  { id: 3, name: "Ball Above Feet", category: "lies", quickTip: "Choke down, aim right", situation: "Standing below ball on sidehill", keyAction: "Grip down on club", icon: "uphill", difficulty: "Medium", clubAdjustment: "Choke down 1-2 inches", ballPosition: "Center of stance", stance: "More upright", swingThoughts: ["Ball will draw", "Aim right", "Swing easy"], memorableQuote: "Ball above feet wants to go left - aim right and let it happen.", proTip: "Choke down on the club to maintain control" },
  { id: 4, name: "Ball Below Feet", category: "lies", quickTip: "Bend more, aim left", situation: "Standing above ball on sidehill", keyAction: "Bend more at waist", icon: "downhill", difficulty: "Hard", clubAdjustment: "Use longer club", ballPosition: "Center of stance", stance: "Bend more at waist", swingThoughts: ["Ball will fade", "Aim left", "Stay down"], memorableQuote: "Ball below feet wants to go right - aim left and stay down through the shot.", proTip: "Take an extra club and swing easier for better balance" },
  
  // BUNKER CATEGORY
  { id: 5, name: "Fairway Bunker", category: "bunker", quickTip: "Ball first contact", situation: "Good lie in fairway bunker", keyAction: "Hit ball before sand", icon: "sand", difficulty: "Medium", clubAdjustment: "+1 club", ballPosition: "Slightly back", stance: "Firm footing, quiet lower body", swingThoughts: ["Ball first", "Stay tall", "Smooth swing"], memorableQuote: "Fairway bunkers are about clean contact - ball first, sand second.", proTip: "Take one more club and swing easier" },
  { id: 6, name: "Greenside Bunker", category: "bunker", quickTip: "Hit sand behind ball", situation: "Short bunker shot to green", keyAction: "Open face, hit sand", icon: "sand", difficulty: "Medium", clubAdjustment: "Sand wedge, open face", ballPosition: "Forward in stance", stance: "Open stance, weight left", swingThoughts: ["Hit sand first", "Follow through", "Accelerate"], memorableQuote: "Let the sand carry the ball out - you're hitting a sand shot, not a ball shot.", proTip: "Open the face and swing along your stance line" },
  { id: 7, name: "Deep Bunker", category: "bunker", quickTip: "Steep swing, more sand", situation: "High lip bunker", keyAction: "Steep angle of attack", icon: "sand", difficulty: "Hard", clubAdjustment: "High lofted wedge", ballPosition: "Forward", stance: "Very open", swingThoughts: ["Swing steep", "Hit more sand", "High finish"], memorableQuote: "In deep bunkers, you need to go up before you go out.", proTip: "Take more sand and swing harder than normal" },
  { id: 8, name: "Wet Sand Bunker", category: "bunker", quickTip: "Less sand, firm swing", situation: "Bunker after rain", keyAction: "Take less sand", icon: "sand", difficulty: "Medium", clubAdjustment: "Square clubface", ballPosition: "Center", stance: "Normal", swingThoughts: ["Less sand", "Firm contact", "Normal swing"], memorableQuote: "Wet sand is firm - treat it more like hardpan than loose sand.", proTip: "Square the face and take less sand than normal" },
  
  // TROUBLE CATEGORY
  { id: 9, name: "Trees/Obstacles", category: "trouble", quickTip: "Punch out safely", situation: "Behind trees or obstacles", keyAction: "Punch out to safety", icon: "trees", difficulty: "Easy", clubAdjustment: "Lower lofted club", ballPosition: "Back in stance", stance: "Narrow", swingThoughts: ["Safety first", "Low trajectory", "Get out"], memorableQuote: "Trees are 90% air, but always plan for the 10% that isn't.", proTip: "Take your medicine - get back to the fairway" },
  { id: 10, name: "Low Punch Shot", category: "trouble", quickTip: "Ball back, hands forward", situation: "Under trees or in wind", keyAction: "Keep ball flight low", icon: "trees", difficulty: "Medium", clubAdjustment: "-2 clubs", ballPosition: "Way back", stance: "Hands forward", swingThoughts: ["Ball back", "Hands forward", "Punch down"], memorableQuote: "When you need to go low, think punch - not swing.", proTip: "Ball back, hands forward, abbreviated follow-through" },
  
  // WIND CATEGORY
  { id: 11, name: "Into the Wind", category: "wind", quickTip: "Club up, swing easy", situation: "Strong headwind", keyAction: "Take more club, swing easier", icon: "withWind", difficulty: "Medium", clubAdjustment: "+2-3 clubs", ballPosition: "Back in stance", stance: "Narrow, weight forward", swingThoughts: ["Club up", "Swing easy", "Low follow through"], memorableQuote: "When it's breezy, swing easy - let the club do the work.", proTip: "Take two extra clubs and swing at 80% power" },
  { id: 12, name: "With the Wind", category: "wind", quickTip: "Club down, full swing", situation: "Strong tailwind", keyAction: "Take less club", icon: "withWind", difficulty: "Easy", clubAdjustment: "-1-2 clubs", ballPosition: "Forward", stance: "Normal", swingThoughts: ["Club down", "Normal swing", "Let wind help"], memorableQuote: "Tailwinds are free distance - don't fight the gift.", proTip: "Take one less club and trust the wind" },
  { id: 13, name: "Crosswind Left to Right", category: "wind", quickTip: "Aim left, allow for drift", situation: "Wind blowing left to right", keyAction: "Aim into the wind", icon: "withWind", difficulty: "Medium", clubAdjustment: "Normal club", ballPosition: "Normal", stance: "Aim left", swingThoughts: ["Aim left", "Normal swing", "Let wind work"], memorableQuote: "Crosswinds require trust - aim into it and let physics do the rest.", proTip: "Aim directly at the wind source and let it blow the ball to target" },
  { id: 14, name: "Crosswind Right to Left", category: "wind", quickTip: "Aim right, allow for drift", situation: "Wind blowing right to left", keyAction: "Aim into the wind", icon: "withWind", difficulty: "Medium", clubAdjustment: "Normal club", ballPosition: "Normal", stance: "Aim right", swingThoughts: ["Aim right", "Normal swing", "Let wind work"], memorableQuote: "Trust the wind - it's more consistent than you think.", proTip: "Aim into the wind and let it bring the ball back" },
  
  // SHOTS CATEGORY
  { id: 15, name: "Fade Shot", category: "shots", quickTip: "Open stance, outside-in swing", situation: "Need ball to curve left to right", keyAction: "Cut across the ball", icon: "target", difficulty: "Medium", clubAdjustment: "+1 club", ballPosition: "Slightly forward", stance: "Open stance", swingThoughts: ["Outside-in", "Hold face open", "Swing left"], memorableQuote: "A controlled fade is a golfer's best friend - reliable and predictable.", proTip: "Open stance and swing along your body line" },
  { id: 16, name: "Draw Shot", category: "shots", quickTip: "Closed stance, inside-out swing", situation: "Need ball to curve right to left", keyAction: "Swing from inside", icon: "target", difficulty: "Hard", clubAdjustment: "Normal club", ballPosition: "Slightly back", stance: "Closed stance", swingThoughts: ["Inside-out", "Release hands", "Swing right"], memorableQuote: "A draw adds distance and roll - the power shot of choice.", proTip: "Close stance and swing out to the right" },
  { id: 17, name: "Flop Shot", category: "shots", quickTip: "Open face, steep swing", situation: "Short distance over obstacle", keyAction: "Hit down steeply", icon: "target", difficulty: "Expert", clubAdjustment: "60° wedge", ballPosition: "Forward", stance: "Very open", swingThoughts: ["Open face wide", "Steep swing", "Accelerate through"], memorableQuote: "The flop shot is high risk, high reward - commit or don't try it.", proTip: "Practice this shot extensively before using on course" },
  { id: 18, name: "Bump and Run", category: "shots", quickTip: "Low loft, chip motion", situation: "Lots of green to work with", keyAction: "Chip with low lofted club", icon: "target", difficulty: "Easy", clubAdjustment: "7-9 iron", ballPosition: "Back", stance: "Narrow, weight left", swingThoughts: ["Chip motion", "Let it roll", "Target landing spot"], memorableQuote: "The bump and run is the most reliable shot around the green.", proTip: "Use a 7 or 8 iron and treat it like a long putt" },
  
  // SHORT GAME CATEGORY
  { id: 19, name: "Pitch Shot", category: "short", quickTip: "Pitching wedge, medium trajectory", situation: "30-60 yards to pin", keyAction: "Three-quarter swing", icon: "putting", difficulty: "Medium", clubAdjustment: "Pitching wedge", ballPosition: "Center", stance: "Narrow", swingThoughts: ["Smooth tempo", "Accelerate through", "High finish"], memorableQuote: "Pitching is about rhythm - find your tempo and trust it.", proTip: "Focus on tempo rather than power" },
  { id: 20, name: "Chip Shot", category: "short", quickTip: "Short backswing, firm through", situation: "Just off the green", keyAction: "Putting motion with loft", icon: "putting", difficulty: "Easy", clubAdjustment: "Sand or gap wedge", ballPosition: "Back", stance: "Weight left", swingThoughts: ["Short backswing", "Firm through", "Follow low"], memorableQuote: "Chipping is putting with a wedge - same motion, different club.", proTip: "Keep wrists firm and think putting stroke" }
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
        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">{shot.name.toUpperCase()}</h2>
            <p className="hole-subtitle">{shot.situation}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${
              shot.difficulty === "Easy" ? "bg-green-100 text-green-700" :
              shot.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
              shot.difficulty === "Hard" ? "bg-red-100 text-red-700" :
              "bg-purple-100 text-purple-700"
            }`}>
              {shot.difficulty}
            </span>
          </div>
          
          <div className="shot-icon mb-6">
            {renderIcon(shot.icon, "text-6xl text-gray-600 mx-auto")}
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Key Action:</span>
              <span className="point-text">{shot.keyAction}</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Club:</span>
              <span className="point-text">{shot.clubAdjustment}</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Ball Position:</span>
              <span className="point-text">{shot.ballPosition}</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Stance:</span>
              <span className="point-text">{shot.stance}</span>
            </div>
          </div>
          
          <div className="swing-thoughts mt-6">
            <h4 className="font-bold text-gray-700 mb-2">Swing Thoughts:</h4>
            <div className="flex flex-wrap gap-2">
              {shot.swingThoughts?.map((thought, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {thought}
                </span>
              ))}
            </div>
          </div>
          
          <div className="pro-tip mt-6">
            <div className="tip-icon">💡</div>
            <p className="tip-text">"{shot.memorableQuote}"</p>
          </div>
          
          <div className="pro-tip mt-4">
            <div className="tip-icon">⛳</div>
            <p className="tip-text font-semibold">{shot.proTip}</p>
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

// Putting content
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
            <p className="text-lg text-slate-600">Read Greens Like a Pro</p>
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
  }
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