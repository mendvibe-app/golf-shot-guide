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
    golf: FaGolfBall,
    
    // Fundamental icons
    setup: FaBullseye,
    grip: FaFire,
    tempo: FaCalculator,
    weightTransfer: FaWind,
    ballPosition: TbTarget,
    alignment: FaBullseye,
    swingPlane: FaWind,
    impact: FaFire,
    followThrough: FaWind,
    routine: FaCalculator
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
          {/* HERO SECTION - Pro Tour Authenticity shot identification */}
          <div className="learn-page-header">
            <div className="learn-title-section">
              <div className="learn-icon-container">
                {renderIcon(shot.icon, "learn-icon")}
              </div>
              <div className="learn-title-content">
                <h1 className="learn-page-title">{shot.name}</h1>
                <p className="learn-page-subtitle">{shot.situation}</p>
                <span className="learn-difficulty-badge">{shot.difficulty}</span>
              </div>
            </div>
            <div className="learn-page-divider"></div>
          </div>

          {/* STRATEGIC CONTEXT - Most important for decision-making */}
          {shot.whenToUse && (
            <div className="learn-section key-points-section mb-8">
              <div className="learn-section-header">
                <span className="learn-section-icon">WHEN</span>
                <h3 className="learn-section-title">When to Use</h3>
              </div>
              <p className="learn-text">{shot.whenToUse}</p>
            </div>
          )}

          {/* SETUP GRID - Pro Tour technical specifications */}
          <div className="learn-section drills-section mb-8">
            <div className="learn-section-header">
                              <span className="learn-section-icon">SETUP</span>
              <h3 className="learn-section-title">Setup & Execution</h3>
            </div>
            <div className="learn-list">
              <div className="learn-item">
                <span className="learn-bullet green">•</span>
                <span className="learn-text"><strong>Key Action:</strong> {shot.keyAction}</span>
              </div>
              <div className="learn-item">
                <span className="learn-bullet green">•</span>
                <span className="learn-text"><strong>Club:</strong> {shot.clubAdjustment}</span>
              </div>
              <div className="learn-item">
                <span className="learn-bullet green">•</span>
                <span className="learn-text"><strong>Ball Position:</strong> {shot.ballPosition}</span>
              </div>
              <div className="learn-item">
                <span className="learn-bullet green">•</span>
                <span className="learn-text"><strong>Stance:</strong> {shot.stance}</span>
              </div>
            </div>
          </div>

          {/* SWING THOUGHTS - Mental game */}
          <div className="learn-section mistakes-section mb-8">
            <div className="learn-section-header">
              <span className="learn-section-icon">THINK</span>
              <h3 className="learn-section-title">Swing Thoughts</h3>
            </div>
            <div className="learn-list">
              {shot.swingThoughts?.map((thought, i) => (
                <div key={i} className="learn-item">
                  <span className="learn-number">{i + 1}</span>
                  <span className="learn-text">{thought}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MEMORY AIDS - Quotes and tips */}
          <div className="learn-insights">
            <div className="learn-insight-card mental-cue-card">
              <div className="insight-header">
                <span className="insight-emoji">REMEMBER</span>
                <h4 className="insight-title">Remember This</h4>
              </div>
              <p className="insight-quote memorable">"{shot.memorableQuote}"</p>
            </div>
            
            <div className="learn-insight-card pro-tip-card">
              <div className="insight-header">
                <span className="insight-emoji">TIP</span>
                <h4 className="insight-title">Pro Tip</h4>
              </div>
              <p className="insight-text">{shot.proTip}</p>
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
            <TbGolf className="text-8xl mx-auto mb-4 golf-icon-bounce" style={{color: 'var(--golf-green)'}} />
            <h1 className="text-4xl font-headers text-golf-green mb-2">Golf Shot Guide</h1>
            <p className="text-lg font-handwritten" style={{color: 'var(--golf-green)'}}>"Professional Shot Selection"</p>
          </div>
          
          <div className="intro-stats grid grid-cols-2 gap-6 mt-8">
            <div className="stat-item">
              <div className="text-2xl font-data text-golf-green">{comprehensiveShotData.length}</div>
              <div className="text-sm font-body text-pencil-gray">Shot Types</div>
            </div>
            <div className="stat-item">
              <div className="text-2xl font-data text-golf-green">Pro</div>
              <div className="text-sm font-body text-pencil-gray">Techniques</div>
            </div>
          </div>
          
          <div className="intro-hint mt-12 text-center">
            <div className="font-handwritten text-golf-green text-sm">Swipe up to begin →</div>
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
          {/* HERO SECTION - Pro Tour Authenticity putt identification */}
          <div className="learn-page-header">
            <div className="learn-title-section">
              <div className="learn-icon-container">
                {renderIcon(putt.icon, "learn-icon")}
              </div>
              <div className="learn-title-content">
                <h1 className="learn-page-title">{putt.name}</h1>
                <p className="learn-page-subtitle">{putt.situation}</p>
                <span className="learn-difficulty-badge">{putt.difficulty}</span>
              </div>
            </div>
            <div className="learn-page-divider"></div>
          </div>

          {/* STRATEGIC CONTEXT - Most important for decision-making */}
          {putt.whenToUse && (
            <div className="learn-section key-points-section mb-8">
              <div className="learn-section-header">
                <span className="learn-section-icon">WHEN</span>
                <h3 className="learn-section-title">When to Use</h3>
              </div>
              <p className="learn-text">{putt.whenToUse}</p>
            </div>
          )}

          {/* SETUP GRID - Pro Tour technical specifications */}
          <div className="learn-section drills-section mb-8">
            <div className="learn-section-header">
                              <span className="learn-section-icon">SETUP</span>
              <h3 className="learn-section-title">Setup & Execution</h3>
            </div>
            <div className="learn-list">
              <div className="learn-item">
                <span className="learn-bullet green">•</span>
                <span className="learn-text"><strong>Key Action:</strong> {putt.keyAction}</span>
              </div>
              <div className="learn-item">
                <span className="learn-bullet green">•</span>
                <span className="learn-text"><strong>Stroke:</strong> {putt.clubAdjustment}</span>
              </div>
              <div className="learn-item">
                <span className="learn-bullet green">•</span>
                <span className="learn-text"><strong>Ball Position:</strong> {putt.ballPosition}</span>
              </div>
              <div className="learn-item">
                <span className="learn-bullet green">•</span>
                <span className="learn-text"><strong>Stance:</strong> {putt.stance}</span>
              </div>
            </div>
          </div>

          {/* SWING THOUGHTS - Mental game */}
          <div className="learn-section mistakes-section mb-8">
            <div className="learn-section-header">
              <span className="learn-section-icon">THINK</span>
              <h3 className="learn-section-title">Key Thoughts</h3>
            </div>
            <div className="learn-list">
              {putt.swingThoughts?.map((thought, i) => (
                <div key={i} className="learn-item">
                  <span className="learn-number">{i + 1}</span>
                  <span className="learn-text">{thought}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MEMORY AIDS - Quotes and tips */}
          <div className="learn-insights">
            <div className="learn-insight-card mental-cue-card">
              <div className="insight-header">
                <span className="insight-emoji">REMEMBER</span>
                <h4 className="insight-title">Remember This</h4>
              </div>
              <p className="insight-quote memorable">"{putt.memorableQuote}"</p>
            </div>
            
            <div className="learn-insight-card pro-tip-card">
              <div className="insight-header">
                <span className="insight-emoji">TIP</span>
                <h4 className="insight-title">Pro Tip</h4>
              </div>
              <p className="insight-text">{putt.proTip}</p>
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
            <FaGolfBall className="text-8xl mx-auto mb-4 golf-icon-bounce" style={{color: 'var(--golf-green)'}} />
            <h1 className="text-4xl font-headers text-golf-green mb-2">Putting Mastery</h1>
            <p className="text-lg font-handwritten" style={{color: 'var(--golf-green)'}}>"Drive for show, putt for dough"</p>
          </div>
          
          <div className="intro-stats grid grid-cols-2 gap-6 mt-8">
            <div className="stat-item">
              <div className="text-2xl font-data text-golf-green">Read</div>
              <div className="text-sm font-body text-pencil-gray">The Break</div>
            </div>
            <div className="stat-item">
              <div className="text-2xl font-data text-golf-green">Speed</div>
              <div className="text-sm font-body text-pencil-gray">Control</div>
            </div>
          </div>
          
          <div className="intro-hint mt-12 text-center">
            <div className="font-handwritten text-golf-green text-sm">Swipe up for techniques →</div>
          </div>
        </div>
      </div>
    )
  },
  ...puttingTechniques.map((putt, index) => createPuttingPage(putt, index))
];

// Complete fundamentals data for learn section
const fundamentalsData = [
  {
    id: 1,
    name: "Proper Setup & Posture",
    icon: "setup",
    difficulty: "Fundamental",
    description: "The foundation of every good golf swing",
    keyPoints: [
      "Stand tall, then bend from hips (not waist)",
      "Knees slightly flexed, weight on balls of feet",
      "Arms hang naturally from shoulders",
      "Shoulders square to target line"
    ],
    commonMistakes: [
      "Hunching over the ball",
      "Standing too close or too far",
      "Weight on heels or toes"
    ],
    drills: [
      "Mirror work: Practice setup at home",
      "Club across shoulders to check alignment",
      "Balance board for weight distribution"
    ],
    proTip: "Good posture at setup = good posture through impact",
    mentalCue: "Athletic position - like a shortstop ready for a ground ball",
    memorableQuote: "Stand proud, then bow to the ball - maintain your spine angle throughout the swing."
  },
  {
    id: 2,
    name: "Proper Grip",
    icon: "grip",
    difficulty: "Fundamental",
    description: "Your only connection to the club",
    keyPoints: [
      "Left hand: Club in fingers, thumb down shaft",
      "Right hand: Fits like a glove over left",
      "See 2-3 knuckles on left hand",
      "Light pressure (5/10) - don't strangle it"
    ],
    commonMistakes: [
      "Gripping in palms instead of fingers",
      "Grip too strong or too weak",
      "Death grip - too much tension"
    ],
    drills: [
      "Grip and re-grip 10 times before each shot",
      "Practice with alignment sticks",
      "Hold club with just index fingers"
    ],
    proTip: "Grip pressure should feel like holding a small bird",
    mentalCue: "Shake hands with the club - firm but friendly",
    memorableQuote: "The club is your dance partner - hold it gently but don't let it lead."
  },
  {
    id: 3,
    name: "Swing Tempo",
    icon: "tempo",
    difficulty: "Medium",
    description: "The rhythm that makes everything work",
    keyPoints: [
      "3:1 ratio - backswing takes 3x longer than downswing",
      "Smooth transition at the top",
      "Accelerate through impact, don't hit AT the ball",
      "Same tempo for all clubs"
    ],
    commonMistakes: [
      "Rushing the downswing",
      "Different tempo for different clubs",
      "Trying to kill the ball"
    ],
    drills: [
      "Count '1-2-3' on backswing, '1' on downswing",
      "Swing with eyes closed focusing on rhythm",
      "Practice swings at 50% speed"
    ],
    proTip: "Ernie Els said: 'Swing as if you have all day'",
    mentalCue: "Think 'low and slow' on the takeaway",
    memorableQuote: "Swing like you're stirring honey - smooth, deliberate, and sweet."
  },
  {
    id: 4,
    name: "Weight Transfer",
    icon: "weightTransfer",
    difficulty: "Medium",
    description: "Power comes from the ground up",
    keyPoints: [
      "Start 50/50, shift to right foot in backswing",
      "Push off right foot to start downswing",
      "Finish with 90% weight on left foot",
      "Lower body leads, upper body follows"
    ],
    commonMistakes: [
      "Reverse pivot (weight forward on backswing)",
      "Hanging back on right side",
      "No weight shift at all"
    ],
    drills: [
      "Step drill: Step into left foot at impact",
      "Swing without right foot on ground",
      "Basketball dribble motion"
    ],
    proTip: "Think of throwing a ball - your weight naturally shifts forward",
    mentalCue: "Push the ground away with your right foot",
    memorableQuote: "Like a pitcher throwing a fastball - power starts from the ground up."
  },
  {
    id: 5,
    name: "Ball Position",
    icon: "ballPosition",
    difficulty: "Fundamental",
    description: "Where you place the ball determines contact quality",
    keyPoints: [
      "Driver: Off left heel for upward strike",
      "Irons: Move progressively back as loft increases",
      "Wedges: Center to slightly back of center",
      "Consistent position relative to left foot"
    ],
    commonMistakes: [
      "Ball too far forward (thin shots)",
      "Ball too far back (fat shots)",
      "Inconsistent positioning"
    ],
    drills: [
      "Use alignment stick as reference point",
      "Practice with different clubs at driving range",
      "Check ball position in mirror"
    ],
    proTip: "Ball position determines angle of attack",
    mentalCue: "Driver sees the ball on a tee, irons hit it on the way down",
    memorableQuote: "The ball doesn't move - you position yourself to meet it perfectly."
  },
  {
    id: 6,
    name: "Alignment",
    icon: "alignment",
    difficulty: "Fundamental",
    description: "Aiming your body and club correctly",
    keyPoints: [
      "Clubface aims at target first",
      "Body aligns parallel left of target line",
      "Feet, knees, hips, shoulders all parallel",
      "Like standing on railroad tracks"
    ],
    commonMistakes: [
      "Aiming body at target instead of parallel",
      "Clubface not square to target",
      "Not checking alignment regularly"
    ],
    drills: [
      "Use alignment sticks on ground",
      "Practice with clubs laid down as guides",
      "Have someone check your alignment"
    ],
    proTip: "Most golfers aim right of their target without knowing it",
    mentalCue: "Body aims parallel left, like train tracks to the target",
    memorableQuote: "Point your body where you want to walk, not where you want the ball to go."
  },
  {
    id: 7,
    name: "Swing Plane",
    icon: "swingPlane",
    difficulty: "Advanced",
    description: "The path your club travels around your body",
    keyPoints: [
      "Club should follow same path back and through",
      "Plane angle determined by club length and posture",
      "Shorter clubs = more upright plane",
      "On-plane swing is most efficient"
    ],
    commonMistakes: [
      "Coming over the top (steep plane)",
      "Getting too flat in backswing",
      "Different planes for different clubs"
    ],
    drills: [
      "Swing under a tilted hula hoop",
      "Practice with club against wall",
      "Video analysis from down-the-line view"
    ],
    proTip: "Good posture naturally creates good plane",
    mentalCue: "Swing the club around your spine like it's a pole",
    memorableQuote: "Imagine your swing is on an invisible ramp - stay on the ramp both ways."
  },
  {
    id: 8,
    name: "Impact Position",
    icon: "impact",
    difficulty: "Advanced",
    description: "The moment of truth in every golf swing",
    keyPoints: [
      "Hands ahead of ball at impact",
      "Weight shifted to left foot",
      "Hips open, shoulders square",
      "Clubface square to target"
    ],
    commonMistakes: [
      "Flipping hands at impact",
      "Weight hanging back",
      "Early release of club"
    ],
    drills: [
      "Impact bag training",
      "Preset impact position practice",
      "Slow motion swings to impact"
    ],
    proTip: "Impact position should look like a forward version of address",
    mentalCue: "Shake hands with the target at impact",
    memorableQuote: "Impact is address position moved forward - everything shifts toward the target."
  },
  {
    id: 9,
    name: "Follow Through",
    icon: "followThrough",
    difficulty: "Medium",
    description: "Completing the swing with proper finish",
    keyPoints: [
      "Full weight transfer to left foot",
      "Chest facing target",
      "Club wrapped around left shoulder",
      "Balanced finish position"
    ],
    commonMistakes: [
      "Falling off balance",
      "Not completing the turn",
      "Decelerating through impact"
    ],
    drills: [
      "Hold finish position for 3 seconds",
      "Practice finishing in balance",
      "Mirror work for proper positions"
    ],
    proTip: "Good finish indicates good swing sequence",
    mentalCue: "Pose for the camera - show off your balanced finish",
    memorableQuote: "Finish like you're showing off your swing to someone you want to impress."
  },
  {
    id: 10,
    name: "Pre-Shot Routine",
    icon: "routine",
    difficulty: "Fundamental",
    description: "Consistent preparation for every shot",
    keyPoints: [
      "Same routine for every shot",
      "Visualize the shot you want",
      "Take practice swings with purpose",
      "Commit fully to your decision"
    ],
    commonMistakes: [
      "Rushed preparation",
      "Different routine under pressure",
      "Not visualizing success"
    ],
    drills: [
      "Practice your routine at the range",
      "Time your routine for consistency",
      "Use routine for every practice shot"
    ],
    proTip: "Routine creates familiarity and confidence",
    mentalCue: "Same recipe every time - it works, so stick with it",
    memorableQuote: "Your routine is your ritual - it turns chaos into calm confidence."
  }
];

// Helper function to create fundamental pages
const createFundamentalPage = (fundamental, index) => ({
  id: fundamental.id,
  title: fundamental.name,
  content: (
    <div className="page-curl-content page-curl-content-learn">
      <div className="page-curl-texture">
        <div className="coffee-stain coffee-stain-2"></div>
        <div className="coffee-stain coffee-stain-3"></div>
      </div>
      
      <div className="page-curl-scrollable">
        {/* Header Section */}
        <div className="learn-page-header">
          <div className="learn-title-section">
            <div className="learn-icon-container">
              {renderIcon(fundamental.icon, "learn-icon")}
            </div>
            <div className="learn-title-content">
              <h2 className="learn-page-title">{fundamental.name}</h2>
              <p className="learn-page-subtitle">{fundamental.description}</p>
              <span className="learn-difficulty-badge">{fundamental.difficulty}</span>
            </div>
          </div>
          <div className="learn-page-divider"></div>
        </div>
        
        {/* Main Content */}
        <div className="learn-content-grid">
          {/* Key Points Section */}
          <div className="learn-section key-points-section">
            <div className="learn-section-header">
              <span className="learn-section-icon">🎯</span>
              <h3 className="learn-section-title">Key Points</h3>
            </div>
            <div className="learn-list">
              {fundamental.keyPoints.map((point, idx) => (
                <div key={idx} className="learn-item learn-key-point">
                  <span className="learn-bullet golf-green">•</span>
                  <span className="learn-text">{point}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Common Mistakes Section */}
          <div className="learn-section mistakes-section">
            <div className="learn-section-header">
              <span className="learn-section-icon">AVOID</span>
              <h3 className="learn-section-title">Avoid These</h3>
            </div>
            <div className="learn-list">
              {fundamental.commonMistakes.map((mistake, idx) => (
                <div key={idx} className="learn-item learn-mistake">
                  <span className="learn-bullet golf-green">•</span>
                  <span className="learn-text">{mistake}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Practice Drills Section */}
          <div className="learn-section drills-section">
            <div className="learn-section-header">
              <span className="learn-section-icon">DRILL</span>
              <h3 className="learn-section-title">Practice Drills</h3>
            </div>
            <div className="learn-list">
              {fundamental.drills.map((drill, idx) => (
                <div key={idx} className="learn-item learn-drill">
                  <span className="learn-number">{idx + 1}</span>
                  <span className="learn-text">{drill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Insights */}
        <div className="learn-insights">
          <div className="learn-insight-card pro-tip-card">
            <div className="insight-header">
              <span className="insight-emoji">TIP</span>
              <h4 className="insight-title">Pro Tip</h4>
            </div>
            <p className="insight-text">{fundamental.proTip}</p>
          </div>
          
          <div className="learn-insight-card mental-cue-card">
            <div className="insight-header">
              <span className="insight-emoji">THINK</span>
              <h4 className="insight-title">Mental Cue</h4>
            </div>
            <p className="insight-quote">"{fundamental.mentalCue}"</p>
          </div>
          
          <div className="learn-insight-card quote-card">
            <div className="insight-header">
              <span className="insight-emoji">QUOTE</span>
              <h4 className="insight-title">Remember This</h4>
            </div>
            <p className="insight-quote memorable">"{fundamental.memorableQuote}"</p>
          </div>
        </div>
      </div>
    </div>
  )
});

// Learn content
const getLearnContent = () => [
  {
    id: 0,
    title: 'Golf Fundamentals',
    content: (
      <div className="page-curl-content page-curl-content-intro">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-1"></div>
        </div>
        
        <div className="page-curl-body flex flex-col items-center justify-center h-full text-center">
          <div className="app-logo mb-8">
            <TbGolf className="text-8xl mx-auto mb-4 golf-icon-bounce" style={{color: 'var(--golf-green)'}} />
            <h1 className="text-4xl font-headers text-golf-green mb-2">Golf Fundamentals</h1>
            <p className="text-lg font-handwritten" style={{color: 'var(--golf-green)'}}>"Master the Essential Skills"</p>
          </div>
          
          <div className="intro-stats grid grid-cols-2 gap-6 mt-8">
            <div className="stat-item">
              <div className="text-2xl font-data text-golf-green">{fundamentalsData.length}</div>
              <div className="text-sm font-body text-pencil-gray">Fundamentals</div>
            </div>
            <div className="stat-item">
              <div className="text-2xl font-data text-golf-green">Pro</div>
              <div className="text-sm font-body text-pencil-gray">Techniques</div>
            </div>
          </div>
          
          <div className="intro-hint mt-12 text-center">
            <div className="font-handwritten text-golf-green text-sm">Swipe up to learn →</div>
          </div>
        </div>
      </div>
    )
  },
  // Add all fundamental pages
  ...fundamentalsData.map((fundamental, index) => createFundamentalPage(fundamental, index))
];