import React from 'react';
import { 
  FaBullseye, FaCalculator, FaGolfBall, FaUser, FaBook,
  FaWind, FaTree, FaWater, FaMountain, FaFire
} from 'react-icons/fa';
import { TbGolf, TbTarget } from 'react-icons/tb';

// Content sets for each tab - designed for sequential page flipping
export const getTabContentSet = (tabId) => {
  switch(tabId) {
    case 'shots':
      return getShotContent();
    case 'calculator':
      return getDistanceContent();
    case 'putting':
      return getPuttingContent();
    case 'ballselection':
      return getBallContent();
    case 'mydata':
      return getDataContent();
    case 'learn':
      return getLearningContent();
    default:
      return [];
  }
};

// Shot selection content - flip through different shot types
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
              <div className="text-2xl font-bold text-green-600">20+</div>
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
  {
    id: 1,
    title: 'DRIVER • TEE SHOTS',
    content: (
      <div className="page-curl-content page-curl-content-amber">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-1"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">DRIVER • TEE SHOTS</h2>
            <p className="hole-subtitle">Maximum distance • Fairway positioning</p>
          </div>
          
          <div className="shot-icon">
            <FaBullseye className="text-6xl text-orange-500 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Setup:</span>
              <span className="point-text">Ball forward, wide stance</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Swing:</span>
              <span className="point-text">Full shoulder turn, sweep through</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Target:</span>
              <span className="point-text">Aim for fairway center</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">💡</div>
            <p className="tip-text">"Tee it high, let it fly - confidence is key"</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'IRON SHOTS • APPROACH',
    content: (
      <div className="page-curl-content page-curl-content-blue">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-3"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">IRON SHOTS • APPROACH</h2>
            <p className="hole-subtitle">Precision to the pin • Distance control</p>
          </div>
          
          <div className="shot-icon">
            <TbTarget className="text-6xl text-blue-500 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Club Selection:</span>
              <span className="point-text">Account for wind & pin position</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Ball Position:</span>
              <span className="point-text">Center to slightly forward</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Contact:</span>
              <span className="point-text">Ball first, then turf</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">⛳</div>
            <p className="tip-text">"Commit to your club choice and swing smooth"</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'WEDGE PLAY • SHORT GAME',
    content: (
      <div className="page-curl-content page-curl-content-green">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-5"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">WEDGE PLAY • SHORT GAME</h2>
            <p className="hole-subtitle">Touch around the green • Spin control</p>
          </div>
          
          <div className="shot-icon">
            <FaFire className="text-6xl text-green-500 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Distance:</span>
              <span className="point-text">30-100 yards to pin</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Technique:</span>
              <span className="point-text">Accelerate through impact</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Landing:</span>
              <span className="point-text">Plan for bounce and roll</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">🎯</div>
            <p className="tip-text">"Visualize the shot landing soft and checking up"</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: 'BUNKER SHOTS • SAND PLAY',
    content: (
      <div className="page-curl-content page-curl-content-amber">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-2"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">BUNKER SHOTS • SAND PLAY</h2>
            <p className="hole-subtitle">Escape technique • Consistent contact</p>
          </div>
          
          <div className="shot-icon">
            <FaMountain className="text-6xl text-yellow-600 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Setup:</span>
              <span className="point-text">Open stance, open clubface</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Entry:</span>
              <span className="point-text">Hit sand 2 inches behind ball</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Follow Through:</span>
              <span className="point-text">Accelerate and finish high</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">⛱️</div>
            <p className="tip-text">"Trust the bounce - let the club do the work"</p>
          </div>
        </div>
      </div>
    )
  }
];

// Distance calculation content - flip through different calculation methods
const getDistanceContent = () => [
  {
    id: 1,
    title: 'DISTANCE BASICS',
    content: (
      <div className="page-curl-content page-curl-content-blue">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-3"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">DISTANCE CALCULATION</h2>
            <p className="hole-subtitle">Accurate yardage • Better scoring</p>
          </div>
          
          <div className="shot-icon">
            <FaCalculator className="text-6xl text-blue-500 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Base Distance:</span>
              <span className="point-text">Know your club carry distances</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Elevation:</span>
              <span className="point-text">+10y per 10ft uphill</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Wind:</span>
              <span className="point-text">Add/subtract based on direction</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">📐</div>
            <p className="tip-text">"Accurate distance = better club selection"</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'WIND ADJUSTMENTS',
    content: (
      <div className="page-curl-content page-curl-content-green">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-5"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">WIND CALCULATIONS</h2>
            <p className="hole-subtitle">Factor in conditions • Adjust accordingly</p>
          </div>
          
          <div className="shot-icon">
            <FaWind className="text-6xl text-gray-500 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Headwind:</span>
              <span className="point-text">Take extra club, swing easier</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Tailwind:</span>
              <span className="point-text">Club down, maintain tempo</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Crosswind:</span>
              <span className="point-text">Aim into wind, let it drift</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">🌪️</div>
            <p className="tip-text">"Feel the wind on your face before every shot"</p>
          </div>
        </div>
      </div>
    )
  }
];

// Putting content - flip through putting techniques
const getPuttingContent = () => [
  {
    id: 1,
    title: 'PUTTING FUNDAMENTALS',
    content: (
      <div className="page-curl-content page-curl-content-green">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-5"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">PUTTING FUNDAMENTALS</h2>
            <p className="hole-subtitle">Stroke mechanics • Green reading</p>
          </div>
          
          <div className="shot-icon">
            <FaGolfBall className="text-6xl text-green-600 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Stance:</span>
              <span className="point-text">Shoulder-width, eyes over ball</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Stroke:</span>
              <span className="point-text">Pendulum motion, shoulders leading</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Follow Through:</span>
              <span className="point-text">Accelerate through impact</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">⛳</div>
            <p className="tip-text">"Trust your read and commit to the line"</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'GREEN READING',
    content: (
      <div className="page-curl-content page-curl-content-blue">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-3"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">GREEN READING</h2>
            <p className="hole-subtitle">Slope analysis • Break prediction</p>
          </div>
          
          <div className="shot-icon">
            <FaWater className="text-6xl text-blue-500 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Overall Slope:</span>
              <span className="point-text">Walk around, feel the grade</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Ball Path:</span>
              <span className="point-text">Visualize the entire journey</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Speed:</span>
              <span className="point-text">Uphill firm, downhill soft</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">👁️</div>
            <p className="tip-text">"Water flows to the lowest point - so will your ball"</p>
          </div>
        </div>
      </div>
    )
  }
];

// Ball selection content
const getBallContent = () => [
  {
    id: 1,
    title: 'BALL SELECTION GUIDE',
    content: (
      <div className="page-curl-content page-curl-content-amber">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-1"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">GOLF BALL SELECTION</h2>
            <p className="hole-subtitle">Performance characteristics • Course conditions</p>
          </div>
          
          <div className="shot-icon">
            <TbGolf className="text-6xl text-orange-500 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Distance Balls:</span>
              <span className="point-text">Lower spin, longer carry</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Tour Balls:</span>
              <span className="point-text">High spin, better control</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Conditions:</span>
              <span className="point-text">Wind, temperature, course firmness</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">🏌️</div>
            <p className="tip-text">"Match your ball to your game and conditions"</p>
          </div>
        </div>
      </div>
    )
  }
];

// Personal data content
const getDataContent = () => [
  {
    id: 1,
    title: 'PERFORMANCE TRACKING',
    content: (
      <div className="page-curl-content page-curl-content-blue">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-3"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">YOUR GOLF DATA</h2>
            <p className="hole-subtitle">Track progress • Identify patterns</p>
          </div>
          
          <div className="shot-icon">
            <FaUser className="text-6xl text-blue-500 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Avg Score:</span>
              <span className="point-text">Track your handicap progress</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Strengths:</span>
              <span className="point-text">Driving accuracy, putting</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Areas to Work:</span>
              <span className="point-text">Short game, course management</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">📊</div>
            <p className="tip-text">"Data reveals what practice should focus on"</p>
          </div>
        </div>
      </div>
    )
  }
];

// Learning content - flip through golf tips
const getLearningContent = () => [
  {
    id: 1,
    title: 'GOLF FUNDAMENTALS',
    content: (
      <div className="page-curl-content page-curl-content-green">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-5"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">GOLF FUNDAMENTALS</h2>
            <p className="hole-subtitle">Build a solid foundation • Consistent improvement</p>
          </div>
          
          <div className="shot-icon">
            <FaBook className="text-6xl text-green-600 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Grip:</span>
              <span className="point-text">Neutral, comfortable, consistent</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Stance:</span>
              <span className="point-text">Athletic posture, balanced setup</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Swing:</span>
              <span className="point-text">Smooth tempo, full extension</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">🏆</div>
            <p className="tip-text">"Master the basics, and everything else follows"</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'COURSE MANAGEMENT',
    content: (
      <div className="page-curl-content page-curl-content-amber">
        <div className="page-curl-texture">
          <div className="coffee-stain coffee-stain-1"></div>
        </div>
        

        
        <div className="page-curl-body">
          <div className="page-curl-header">
            <h2 className="hole-title">COURSE MANAGEMENT</h2>
            <p className="hole-subtitle">Strategic thinking • Lower scores</p>
          </div>
          
          <div className="shot-icon">
            <FaTree className="text-6xl text-green-700 mx-auto mb-4" />
          </div>
          
          <div className="shot-details space-y-4">
            <div className="shot-point">
              <span className="point-label">Play Smart:</span>
              <span className="point-text">Course position over hero shots</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Risk vs Reward:</span>
              <span className="point-text">When to be aggressive</span>
            </div>
            <div className="shot-point">
              <span className="point-label">Mental Game:</span>
              <span className="point-text">Stay positive, plan each shot</span>
            </div>
          </div>
          
          <div className="pro-tip">
            <div className="tip-icon">🧠</div>
            <p className="tip-text">"Think your way around the course"</p>
          </div>
        </div>
      </div>
    )
  }
];

export default { getTabContentSet };