import React, { useState } from "react";
import { 
  FaSearch, 
  FaBullseye, 
  FaCalculator, 
  FaBook, 
  FaUser,
  FaGolfBall,
  FaTree,
  FaWind,
  FaEye,
  FaClock,
  FaFistRaised,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaFire,
  FaSnowflake,
  FaLeaf,
  FaHome,
  FaMountain,
  FaWater,
  FaRuler,
  FaFlag
} from "react-icons/fa";

import ContextAwarePageCurl from "./components/ContextAwarePageCurl";
import { 
  MdGolfCourse,
  MdSportsGolf,
  MdTerrain,
  MdLandscape,
  MdWaves,
  MdGrass,
  MdSpeed,
  MdRotateRight,
  MdRotateLeft,
  MdTrendingUp,
  MdTrendingDown,
  MdStraighten,
  MdCallMade
} from "react-icons/md";
import {
  TbArrowWaveRightUp,
  TbArrowWaveRightDown,
  TbWind,
  TbTarget,
  TbGolf
} from "react-icons/tb";

const GolfShotGuide = () => {
  // Add spiral binding styles to the document
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Weathered Metal Spiral Binding - Pro Tour Authentic */
      .spiral-binding {
        position: relative;
        height: 3rem;
        background: linear-gradient(to bottom, 
          var(--aged-white) 0%,
          var(--coffee-stain) 20%, 
          var(--leather-brown) 40%, 
          rgba(139, 69, 19, 0.8) 60%, 
          rgba(101, 67, 33, 0.9) 80%, 
          var(--leather-brown) 100%
        );
        border-bottom: 2px solid var(--golf-green);
        box-shadow: 
          0 3px 12px rgba(0, 0, 0, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.4),
          inset 0 -2px 0 rgba(0, 0, 0, 0.2);
        pointer-events: none;
      }

      .spiral-holes {
        display: flex; 
        justify-content: space-evenly; 
        align-items: center;
        height: 100%; 
        padding: 0 2rem;
        pointer-events: none;
      }

      .spiral-hole {
        position: relative;
        width: 1rem; 
        height: 1rem; 
        background: radial-gradient(circle at 35% 25%, 
          var(--aged-white) 0%, 
          var(--coffee-stain) 25%, 
          var(--leather-brown) 50%, 
          rgba(45, 80, 22, 0.8) 75%, 
          var(--golf-green) 100%
        );
        border-radius: 50%; 
        box-shadow: 
          inset 0 4px 8px rgba(0, 0, 0, 0.6),
          inset 0 -2px 0 rgba(255, 255, 255, 0.2),
          0 2px 4px rgba(0, 0, 0, 0.4);
        border: 1px solid var(--golf-green);
        pointer-events: none;
      }

      .spiral-hole::before {
        content: '';
        position: absolute;
        top: -8px; bottom: -8px;
        left: 50%; 
        transform: translateX(-50%);
        width: 5px;
        background: linear-gradient(to right,
          var(--leather-brown) 0%,
          var(--aged-white) 25%,
          var(--coffee-stain) 50%,
          var(--aged-white) 75%,
          var(--leather-brown) 100%
        );
        border-radius: 2px;
        box-shadow: 
          inset 1px 0 0 rgba(255, 255, 255, 0.4),
          inset -1px 0 0 rgba(0, 0, 0, 0.4),
          2px 0 6px rgba(0, 0, 0, 0.3);
        z-index: -1;
      }

      .spiral-hole::after {
        content: '';
        position: absolute;
        top: -12px; bottom: -12px;
        left: 50%; 
        transform: translateX(-50%) rotate(0deg);
        width: 4px;
        background: linear-gradient(45deg,
          #6c757d 0%,
          #adb5bd 25%,
          #e9ecef 50%,
          #adb5bd 75%,
          #6c757d 100%
        );
        border-radius: 2px;
        box-shadow: 
          1px 0 2px rgba(0, 0, 0, 0.3),
          inset 0.5px 0 0 rgba(255, 255, 255, 0.4);
        z-index: -2;
        animation: subtleShimmer 4s ease-in-out infinite;
      }

      @keyframes subtleShimmer {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShot, setSelectedShot] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [activeTab, setActiveTab] = useState("shots");
  const [selectedFundamental, setSelectedFundamental] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Putting mastery states
  const [selectedPuttingSection, setSelectedPuttingSection] = useState(null);


  // Yardage chart by skill level - from Reference Image 8
  const yardageBySkillLevel = {
    beginner: {
      driver: 200, wood3: 185, wood5: 170, wood7: 155, hybrid18: 165, hybrid21: 145,
      hybrid24: 135, iron5: 125, iron6: 115, iron7: 110, iron8: 105, iron9: 100,
      wedge: 90, gapWedge: 75, sandWedge: 65, lobWedge: 50
    },
    average: {
      driver: 250, wood3: 225, wood5: 215, wood7: 205, hybrid18: 195, hybrid21: 185,
      hybrid24: 175, iron5: 165, iron6: 155, iron7: 145, iron8: 135, iron9: 125,
      wedge: 115, gapWedge: 100, sandWedge: 85, lobWedge: 70
    },
    good: {
      driver: 190, wood3: 170, wood5: 155, wood7: 140, hybrid18: 135, hybrid21: 125,
      hybrid24: 115, iron5: 105, iron6: 95, iron7: 85, iron8: 75, iron9: 65,
      wedge: 55, gapWedge: 45, sandWedge: 35, lobWedge: 25
    }
  };

  // Personal settings
  const [personalSettings, setPersonalSettings] = useState({
    skillLevel: "average", // beginner, average, good
    distances: {
      driver: 250, wood3: 220, wood5: 200, iron4: 180, iron5: 170,
      iron6: 160, iron7: 150, iron8: 140, iron9: 130, pw: 120,
      gw: 100, sw: 80, lw: 60
    }
  });

  // Distance calculator state
  const [distance, setDistance] = useState(150);
  const [wind, setWind] = useState("none");
  const [windSpeed, setWindSpeed] = useState(0);

  // Round management state
  const [rounds, setRounds] = useState([
    {
      id: 1,
      date: "2025-01-15",
      course: "Pebble Beach Golf Links",
      score: 82,
      par: 72,
      front9: 41,
      back9: 41,
      fairways: 9,
      fairwaysTotal: 14,
      gir: 8,
      girTotal: 18,
      totalPutts: 32,
      threePutts: 2,
      bestHoles: "7th: Great drive and 8-iron to 8 feet for birdie",
      worstHoles: "12th: Pulled drive into trees, poor recovery led to double",
      mentalNotes: "Stayed patient on back nine, good course management",
      conditions: "Windy conditions 15-20mph, firm greens"
    }
  ]);

  // Edit states
  const [editingDistances, setEditingDistances] = useState(false);
  const [tempDistances, setTempDistances] = useState({});
  const [showAddRound, setShowAddRound] = useState(false);
  const [newRound, setNewRound] = useState({
    course: "",
    date: new Date().toISOString().split('T')[0],
    score: "",
    par: 72,
    front9: "",
    back9: "",
    fairways: "",
    fairwaysTotal: 14,
    gir: "",
    girTotal: 18,
    totalPutts: "",
    threePutts: "",
    bestHoles: "",
    worstHoles: "",
    mentalNotes: "",
    conditions: ""
  });

  // Comprehensive icon mapping for professional golf icons
  const iconMapping = {
    // LIES CATEGORY
    uphill: MdTerrain,
    downhill: MdLandscape,
    ballAbove: TbArrowWaveRightUp,
    ballBelow: TbArrowWaveRightDown,
    hardpan: FaMountain,
    pineNeedles: FaLeaf,
    divot: MdGrass,
    
    // BUNKER CATEGORY
    bunker: MdWaves,
    fairwayBunker: MdGolfCourse,
    buriedLie: FaFistRaised,
    uphillBunker: FaArrowUp,
    longBunker: FaRuler,
    
    // TROUBLE CATEGORY
    punch: FaFistRaised,
    underTrees: FaTree,
    aroundTrees: MdCallMade,
    deepRough: MdGrass,
    wetConditions: FaWater,
    
    // SHOTS CATEGORY
    draw: MdRotateLeft,
    fade: MdRotateRight,
    high: FaArrowUp,
    low: FaArrowDown,
    stinger: FaFire,
    
    // SHORT GAME CATEGORY
    chip: TbTarget,
    pitch: FaArrowUp,
    flop: FaSnowflake,
    bumpAndRun: FaHome,
    belliedWedge: MdStraighten,
    texasWedge: TbGolf,
    
    // WIND CATEGORY
    intoWind: TbWind,
    withWind: FaWind,
    crosswindLeft: FaArrowLeft,
    crosswindRight: FaArrowRight,
    swirlingWind: FaWind,
    
    // FUNDAMENTALS
    setup: MdSportsGolf,
    grip: FaFistRaised,
    tempo: FaClock,
    weightTransfer: MdSpeed,
    ballPosition: TbTarget,
    alignment: MdStraighten,
    swingPlane: TbArrowWaveRightUp,
    impact: FaFire,
    followThrough: MdTrendingUp,
    routine: FaClock,
    
    // GOLF GENERAL
    golf: FaGolfBall,
    putting: TbGolf,
    
    // NEW CATEGORIES - from reference images
    wood: MdGolfCourse,
    iron: FaFire,
    grass: MdGrass,
    water: FaWater,
    
    // PUTTING MASTERY ICONS
    eye: FaEye,
    ruler: FaRuler,
    target: TbTarget,
    brain: FaUser, // Using FaUser as brain icon substitute
    wrench: FaFistRaised // Using FaFistRaised as wrench icon substitute
  };

  // Helper function to render icons
  const renderIcon = (iconName, className = "w-6 h-6") => {
    const IconComponent = iconMapping[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    // Fallback to emoji if not found
    return <span className={className}>{iconName}</span>;
  };

  // Complete shotData with all shot types including reference book content
  const shotData = [
    // FAIRWAY CATEGORY - From Reference Image 2
    {
      id: 34,
      name: "Fairway Woods",
      category: "fairway",
      quickTip: "Square stance, ball back from left heel",
      situation: "Long approach shots from fairway",
      keyAction: "Clean contact with sweeping motion",
      icon: "wood",
      difficulty: "Medium", 
      timeToRead: "35s",
      clubAdjustment: "3-wood or 5-wood",
      ballPosition: "Slightly back from left heel",
      stance: "Square stance, weight evenly distributed",
      swingThoughts: ["Sweep the ball off fairway", "Keep head behind ball", "Wide arc"],
      memorableQuote: "Think of fairway woods as long irons with more loft - sweep don't dig.",
      proTip: "Ball positioned back from left heel helps solid contact"
    },
    {
      id: 35,
      name: "Long Irons from Fairway",
      category: "fairway",
      quickTip: "Align body right of target, ball in middle",
      situation: "Long iron approach shots, 180-220 yards",
      keyAction: "Hit ball first, then turf",
      icon: "iron",
      difficulty: "Hard",
      timeToRead: "40s",
      clubAdjustment: "4-iron, 5-iron, or hybrid",
      ballPosition: "Ball in middle of stance",
      stance: "Align body slightly right of target",
      swingThoughts: ["Hit down on ball", "Weight more on left side", "Aggressive through impact"],
      memorableQuote: "Long irons demand respect - commit to hitting down and through.",
      proTip: "Weight more on left side helps compress the ball"
    },
    {
      id: 36,
      name: "Under Trees",
      category: "fairway",
      quickTip: "Closed face, aim right of target",
      situation: "When trees block normal shot to green",
      keyAction: "Keep trajectory under branches",
      icon: "underTrees",
      difficulty: "Expert",
      timeToRead: "45s",
      clubAdjustment: "+2-3 clubs for distance",
      ballPosition: "Ball back in stance",
      stance: "Closed face at address, aim right",
      swingThoughts: ["Close face at address", "Punch shot technique", "Follow through low"],
      memorableQuote: "If under trees, aim right of target - let closed face bring it back.",
      proTip: "Closed face counteracts tendency to push when aiming right"
    },

    // LIES CATEGORY
    {
      id: 1,
      name: "Uphill Lie",
      category: "lies",
      quickTip: "Club up, swing with the slope",
      situation: "Standing below the ball - classic uphill lie",
      keyAction: "Swing WITH the slope - let it help you",
      icon: "uphill",
      difficulty: "Medium",
      timeToRead: "30s",
      clubAdjustment: "+1 club",
      ballPosition: "Forward in stance",
      stance: "Wider, perpendicular to slope",
      swingThoughts: ["Swing up the hill", "Stay balanced", "Finish high"],
      memorableQuote: "Like Tiger always says - use the slope as your friend, not your enemy.",
      proTip: "The ball will fly higher and shorter than normal"
    },
    {
      id: 2,
      name: "Downhill Lie", 
      category: "lies",
      quickTip: "Less club, stay down through impact",
      situation: "Ball sitting below you on a downslope",
      keyAction: "Chase the ball down the hill",
      icon: "downhill",
      difficulty: "Hard",
      timeToRead: "45s",
      clubAdjustment: "-1 club",
      ballPosition: "Back in stance",
      stance: "Narrow, weight forward",
      swingThoughts: ["Follow the slope", "Stay down", "Weight forward"],
      memorableQuote: "Butch Harmon teaches: 'Ski down the mountain - gravity is your friend here.'",
      proTip: "Ball will fly lower and farther than normal"
    },
    {
      id: 3,
      name: "Ball Above Feet",
      category: "lies", 
      quickTip: "Grip down, aim right of target",
      situation: "Standing below the ball on a sidehill",
      keyAction: "Swing more around your body",
      icon: "ballAbove",
      difficulty: "Medium",
      timeToRead: "30s",
      clubAdjustment: "Choke down 1-2 inches",
      ballPosition: "Center of stance",
      stance: "More upright posture",
      swingThoughts: ["Stand taller", "Swing around", "Ball will hook"],
      memorableQuote: "Hogan said it best: 'When the ball's above your feet, swing like you're swinging a baseball bat.'",
      proTip: "Ball will draw significantly - aim right"
    },
    {
      id: 4,
      name: "Ball Below Feet",
      category: "lies",
      quickTip: "Bend more, aim left",
      situation: "Standing above ball on sidehill",
      keyAction: "Stay down through impact",
      icon: "ballBelow",
      difficulty: "Hard",
      timeToRead: "40s",
      clubAdjustment: "+1 club for reach",
      ballPosition: "Center of stance",
      stance: "Bend more from hips",
      swingThoughts: ["Stay down", "Maintain posture", "Ball will fade"],
      memorableQuote: "Like picking up a coin - bend and stay bent through the swing.",
      proTip: "Ball will fade significantly - aim left of target"
    },

    // SIDEHILL CATEGORY - Enhanced from Reference Image 6  
    {
      id: 42,
      name: "Sidehill Lies - Ball Below Feet Level",
      category: "sidehill", 
      quickTip: "If ball is below feet level, aim LEFT of target",
      situation: "Ball positioned below your feet on slope",
      keyAction: "Use one club longer, open stance",
      icon: "ballBelow",
      difficulty: "Hard",
      timeToRead: "40s",
      clubAdjustment: "Use one club longer",
      ballPosition: "Ball 3-4\" off left heel",
      stance: "Open stance, weight on left side", 
      swingThoughts: ["Ball 3-4\" off left heel", "Weight on left side", "Ball 2\" back from left heel"],
      memorableQuote: "Ball below feet makes it fade - aim left and trust the slope.",
      proTip: "Ball will fade significantly - aim left of target"
    },
    {
      id: 43,
      name: "Sidehill Lies - Ball Higher Than Feet Level",
      category: "sidehill",
      quickTip: "Aim to RIGHT of target", 
      situation: "Ball positioned above your feet on slope",
      keyAction: "Closed stance, hands in front of ball",
      icon: "ballAbove",
      difficulty: "Hard",
      timeToRead: "40s",
      clubAdjustment: "Weight more on left side",
      ballPosition: "Ball 2\" back from left heel",
      stance: "Closed stance, hands in front of ball",
      swingThoughts: ["Weight more on left side", "Ball 2\" back from left heel", "Check grip, extension left arm, turn hip"],
      memorableQuote: "Ball above feet creates draw - aim right and let it curve back.",
      proTip: "Ball will draw significantly due to slope angle"
    },

    {
      id: 5,
      name: "Hardpan Lie",
      category: "lies",
      quickTip: "Clean contact, no divot",
      situation: "Ball on hard, bare ground",
      keyAction: "Pick it clean",
      icon: "hardpan",
      difficulty: "Hard",
      timeToRead: "35s",
      clubAdjustment: "Less lofted club",
      ballPosition: "Slightly back",
      stance: "Narrow, weight left",
      swingThoughts: ["Steep swing", "Hit ball first", "No divot"],
      memorableQuote: "Like hitting off concrete - sweep it clean, don't dig.",
      proTip: "Consider putting from long distance instead"
    },
    {
      id: 6,
      name: "Pine Needles",
      category: "lies",
      quickTip: "Don't ground club",
      situation: "Ball sitting on pine needles",
      keyAction: "Hover club at address",
      icon: "pineNeedles",
      difficulty: "Medium",
      timeToRead: "25s",
      clubAdjustment: "Normal selection",
      ballPosition: "Normal position",
      stance: "Careful balance",
      swingThoughts: ["Don't ground club", "Smooth tempo", "Trust the lie"],
      memorableQuote: "Pine needles are nature's tees - the ball sits up beautifully.",
      proTip: "Grounding the club is a penalty - hover it"
    },
    {
      id: 7,
      name: "Divot",
      category: "lies",
      quickTip: "Ball back, hands ahead",
      situation: "Ball sitting in old divot",
      keyAction: "Hit down and through",
      icon: "divot",
      difficulty: "Medium",
      timeToRead: "30s",
      clubAdjustment: "+1 club",
      ballPosition: "Back of stance",
      stance: "Weight left, hands ahead",
      swingThoughts: ["Ball back", "Hands ahead", "Hit down"],
      memorableQuote: "Dig it out like you're angry at the person who didn't replace their divot.",
      proTip: "Ball will come out lower than normal"
    },

    // SAND CATEGORY - Enhanced from Reference Image 3
    {
      id: 37,
      name: "Sand Trap - Good Lie",
      category: "sand",
      quickTip: "Open club face, use open stance",
      situation: "Ball sitting cleanly in sand near green",
      keyAction: "Hit sand behind ball, follow through",
      icon: "bunker",
      difficulty: "Medium",
      timeToRead: "45s",
      clubAdjustment: "Sand wedge",
      ballPosition: "Ball back of left heel",
      stance: "Open stance, weight more on left",
      swingThoughts: ["Open club face", "Use open stance", "Hit 2\" behind ball"],
      memorableQuote: "Good lies in sand are gifts - use open face and accelerate through.",
      proTip: "Weight more on left, implant both feet"
    },
    {
      id: 38,
      name: "Sand Trap - Bad Lie",
      category: "sand",
      quickTip: "Close face, use wedge not sand wedge",
      situation: "Ball buried or in footprint in sand",
      keyAction: "Hit 1\" behind ball with full follow through",
      icon: "buriedLie",
      difficulty: "Hard",
      timeToRead: "50s",
      clubAdjustment: "Wedge (not Sand Wedge)",
      ballPosition: "Hit 2\" behind ball, full follow through",
      stance: "Closed stance, hands in front of ball",
      swingThoughts: ["Close face", "Use wedge", "Hit closer to ball", "Arm and hand shot"],
      memorableQuote: "Bad lies need aggression - close face and don't quit on the shot.",
      proTip: "No body movement - all arms and hands through impact"
    },
    {
      id: 39,
      name: "Pitch Shots",
      category: "sand",
      quickTip: "8, 9 Iron or Wedge",
      situation: "Short approach requiring high, soft landing",
      keyAction: "Ball in front of right heel, hands in front",
      icon: "pitch",
      difficulty: "Medium",
      timeToRead: "40s",
      clubAdjustment: "8-iron, 9-iron, or Wedge",
      ballPosition: "Ball in front of right heel",
      stance: "Open stance, weight more on left side",
      swingThoughts: ["Hands in front of ball", "No body movement", "Arm extension and cocked wrist shot"],
      memorableQuote: "Pitch shots are about precision - quiet body, active hands.",
      proTip: "Hit ball crisply with descending blow"
    },

    // BUNKER CATEGORY
    {
      id: 8,
      name: "Greenside Bunker",
      category: "bunker",
      quickTip: "Open the blade, splash the sand",
      situation: "Ball sitting in the beach near the green",
      keyAction: "Blast the sand, not the ball",
      icon: "bunker",
      difficulty: "Medium",
      timeToRead: "45s",
      clubAdjustment: "Sand wedge",
      ballPosition: "Forward in stance",
      stance: "Open stance, feet buried",
      swingThoughts: ["Open face", "Hit sand first", "Follow through high"],
      memorableQuote: "Gary Player's secret: 'Hit two inches behind the ball and accelerate like you're saving par.'",
      proTip: "Accelerate through - never decelerate"
    },
    {
      id: 9,
      name: "Fairway Bunker",
      category: "bunker",
      quickTip: "Clean contact, club up",
      situation: "Ball in fairway sand trap",
      keyAction: "Pick it clean",
      icon: "fairwayBunker",
      difficulty: "Hard",
      timeToRead: "40s",
      clubAdjustment: "+1-2 clubs",
      ballPosition: "Center of stance",
      stance: "Stable, feet barely buried",
      swingThoughts: ["Clean contact", "Ball first", "Stay balanced"],
      memorableQuote: "Think of it as hitting off a sandy tee - sweep it clean.",
      proTip: "If lip is high, prioritize getting out over distance"
    },
    {
      id: 10,
      name: "Buried Lie (Fried Egg)",
      category: "bunker",
      quickTip: "Square face, dig it out",
      situation: "Ball buried in sand",
      keyAction: "Hit behind ball hard",
      icon: "buriedLie",
      difficulty: "Hard",
      timeToRead: "50s",
      clubAdjustment: "Sand wedge",
      ballPosition: "Center of stance",
      stance: "Square, aggressive setup",
      swingThoughts: ["Square face", "Hit hard behind", "Dig and follow through"],
      memorableQuote: "Like digging a hole - go in hard and don't quit.",
      proTip: "Ball will come out with no spin and run"
    },
    {
      id: 11,
      name: "Uphill Bunker",
      category: "bunker",
      quickTip: "Follow slope angle",
      situation: "Ball on upslope in bunker",
      keyAction: "Swing up the hill",
      icon: "uphillBunker",
      difficulty: "Hard",
      timeToRead: "45s",
      clubAdjustment: "Less lofted wedge",
      ballPosition: "Forward in stance",
      stance: "Perpendicular to slope",
      swingThoughts: ["Match slope angle", "Swing up hill", "High finish"],
      memorableQuote: "Let the slope add loft - swing with the hill, not against it.",
      proTip: "Ball will fly higher than normal"
    },
    {
      id: 12,
      name: "Long Bunker Shot",
      category: "bunker",
      quickTip: "Less sand, more ball",
      situation: "30+ yards from bunker to pin",
      keyAction: "Pick it clean",
      icon: "longBunker",
      difficulty: "Expert",
      timeToRead: "50s",
      clubAdjustment: "Gap wedge or 9-iron",
      ballPosition: "Center of stance",
      stance: "Slightly open",
      swingThoughts: ["Less sand", "Ball first", "Commit to swing"],
      memorableQuote: "Like a fairway bunker but with more sand - clean contact is king.",
      proTip: "Practice this shot - it's a round-saver"
    },

    // TROUBLE CATEGORY
    {
      id: 13,
      name: "Punch Shot", 
      category: "trouble",
      quickTip: "Ball back, hands ahead, punch and hold",
      situation: "Stuck under the lumber or fighting wind",
      keyAction: "Keep it under the radar",
      icon: "punch",
      difficulty: "Easy",
      timeToRead: "20s",
      clubAdjustment: "+1-2 clubs",
      ballPosition: "Back of stance",
      stance: "Narrow, weight left",
      swingThoughts: ["Ball back", "Hands ahead", "Low finish"],
      memorableQuote: "Seve Ballesteros: 'Trees are 90% air - hit it low and trust your hands.'",
      proTip: "Ball will release more than normal"
    },
    {
      id: 14,
      name: "Under Trees",
      category: "trouble",
      quickTip: "Ultra-low trajectory",
      situation: "Very low hanging branches",
      keyAction: "Keep it under the canopy",
      icon: "underTrees",
      difficulty: "Medium",
      timeToRead: "35s",
      clubAdjustment: "+2-3 clubs",
      ballPosition: "Way back in stance",
      stance: "Very narrow, steep shoulders",
      swingThoughts: ["Ball way back", "Hands very forward", "Quarter swing"],
      memorableQuote: "Think limbo - how low can you go?",
      proTip: "Sometimes sideways is the only way"
    },
    {
      id: 15,
      name: "Around Trees",
      category: "trouble",
      quickTip: "Shape shot around obstacle",
      situation: "Tree blocking direct path",
      keyAction: "Curve around the tree",
      icon: "aroundTrees",
      difficulty: "Expert",
      timeToRead: "60s",
      clubAdjustment: "Based on shot shape needed",
      ballPosition: "Adjusted for desired curve",
      stance: "Open or closed as needed",
      swingThoughts: ["Pick your curve", "Commit to shape", "Start ball at tree"],
      memorableQuote: "The tree is your friend - use it as an aiming point for your curve.",
      proTip: "Know your natural shot shape and use it"
    },
    {
      id: 16,
      name: "Deep Rough",
      category: "trouble",
      quickTip: "Steep swing, more club",
      situation: "Ball buried in thick grass",
      keyAction: "Hack it out",
      icon: "deepRough",
      difficulty: "Hard",
      timeToRead: "40s",
      clubAdjustment: "+2-3 clubs",
      ballPosition: "Back of stance",
      stance: "Open, aggressive setup",
      swingThoughts: ["Steep swing", "Hit down hard", "Don't try to help it"],
      memorableQuote: "Like chopping wood - go in hard and let the club do the work.",
      proTip: "Sometimes getting out is more important than distance"
    },
    {
      id: 17,
      name: "Wet Conditions",
      category: "trouble",
      quickTip: "Less roll, more carry",
      situation: "Course is wet and soft",
      keyAction: "Plan for no roll",
      icon: "wetConditions",
      difficulty: "Medium",
      timeToRead: "30s",
      clubAdjustment: "+1 club for distance",
      ballPosition: "Normal position",
      stance: "Secure footing",
      swingThoughts: ["All carry", "No roll expected", "Secure grip"],
      memorableQuote: "When it's wet, what you see is what you get - no bonus roll.",
      proTip: "Clean your clubs and grip frequently"
    },

    // SHOTS CATEGORY
    {
      id: 18,
      name: "Draw Shot",
      category: "shots",
      quickTip: "Aim right, close stance",
      situation: "Need ball to curve right to left",
      keyAction: "Swing from inside-out",
      icon: "draw",
      difficulty: "Medium",
      timeToRead: "35s",
      clubAdjustment: "Normal club selection",
      ballPosition: "Slightly back from normal",
      stance: "Closed stance, right foot back",
      swingThoughts: ["Swing to right field", "Release the hands", "Body aims right"],
      memorableQuote: "Like a tennis forehand - finish low with hands below your ears for the draw.",
      proTip: "Aim where you want the ball to start, not finish"
    },
    {
      id: 19,
      name: "Fade Shot",
      category: "shots",
      quickTip: "Aim left, open stance",
      situation: "Need ball to curve left to right",
      keyAction: "Swing from outside-in",
      icon: "fade",
      difficulty: "Medium",
      timeToRead: "35s",
      clubAdjustment: "Normal club selection",
      ballPosition: "Slightly forward from normal",
      stance: "Open stance, left foot back",
      swingThoughts: ["Swing to left field", "Hold off release", "Body aims left"],
      memorableQuote: "Like a tennis slice - cut across the ball with firm wrists.",
      proTip: "Fade shots land softer and stop quicker"
    },
    {
      id: 20,
      name: "High Shot",
      category: "shots",
      quickTip: "Ball forward, high finish",
      situation: "Need to fly over obstacle",
      keyAction: "Launch it high",
      icon: "high",
      difficulty: "Medium",
      timeToRead: "30s",
      clubAdjustment: "More lofted club",
      ballPosition: "Forward in stance",
      stance: "Slightly open, weight back",
      swingThoughts: ["Ball forward", "High finish", "Help it up"],
      memorableQuote: "Think rocket launch - up, up, and away!",
      proTip: "Ball will land softer but shorter"
    },
    {
      id: 21,
      name: "Low Shot",
      category: "shots",
      quickTip: "Ball back, low finish",
      situation: "Need to stay under wind or obstacles",
      keyAction: "Keep trajectory down",
      icon: "low",
      difficulty: "Easy",
      timeToRead: "25s",
      clubAdjustment: "Less lofted club",
      ballPosition: "Back in stance",
      stance: "Weight forward",
      swingThoughts: ["Ball back", "Hands ahead", "Low finish"],
      memorableQuote: "Think golf ball is trying to stay out of the wind.",
      proTip: "Ball will run more upon landing"
    },
    {
      id: 22,
      name: "Stinger",
      category: "shots",
      quickTip: "Ultra-low penetrating shot",
      situation: "Strong headwind or need maximum roll",
      keyAction: "Drive it low and hard",
      icon: "stinger",
      difficulty: "Expert",
      timeToRead: "45s",
      clubAdjustment: "Long iron or hybrid",
      ballPosition: "Way back in stance",
      stance: "Weight heavily forward",
      swingThoughts: ["Ball way back", "Steep shoulders", "Chase low"],
      memorableQuote: "Like Tiger's stinger - a bullet that hugs the ground.",
      proTip: "Perfect for windy conditions"
    },

    // CHIP CATEGORY - Enhanced from Reference Image 4
    {
      id: 40,
      name: "Chip Shots - 5-6-7 Irons",
      category: "chip",
      quickTip: "Feet close together, square stance",
      situation: "Short chips around green with room to run",
      keyAction: "Ball in middle of stance, no body movement",
      icon: "chip",
      difficulty: "Easy",
      timeToRead: "30s",
      clubAdjustment: "5-iron, 6-iron, or 7-iron",
      ballPosition: "Ball in middle of stance",
      stance: "Feet close together (Square Stance)",
      swingThoughts: ["Weight more on left side", "Hands in front of ball", "Hit ball in front of green and roll to target"],
      memorableQuote: "Chip shots are about simplicity - quiet body, crisp contact.",
      proTip: "Less lofted clubs run more predictably than wedges"
    },
    {
      id: 41,
      name: "Uphill Lies",
      category: "chip",
      quickTip: "Aim to RIGHT of target",
      situation: "Ball above feet on uphill slope",
      keyAction: "Closed stance, maintain weight throughout swing",
      icon: "ballAbove",
      difficulty: "Medium",
      timeToRead: "35s",
      clubAdjustment: "Ball about 3\" off left heel",
      ballPosition: "Ball about 3\" off left heel",
      stance: "Closed stance, hands in front of ball",
      swingThoughts: ["Ball about 3\" off left heel", "Hands in front of ball", "Maintain weight more on left side throughout swing"],
      memorableQuote: "Uphill lies make the ball draw - aim right and let slope bring it back.",
      proTip: "Ball will draw significantly due to slope"
    },

    // SHORT GAME CATEGORY
    {
      id: 23,
      name: "Chip Shot",
      category: "short",
      quickTip: "Putting motion with loft",
      situation: "Just off green, not much green to work with",
      keyAction: "Run it close",
      icon: "chip",
      difficulty: "Easy",
      timeToRead: "25s",
      clubAdjustment: "7-9 iron typically",
      ballPosition: "Back of stance",
      stance: "Narrow, weight left",
      swingThoughts: ["Putting stroke", "Ball back", "Low and running"],
      memorableQuote: "Like a long putt with a lofted club - let it run to the hole.",
      proTip: "Use less lofted clubs when possible"
    },
    {
      id: 24,
      name: "Pitch Shot",
      category: "short",
      quickTip: "Soft landing, high trajectory",
      situation: "Need to fly most of the way to pin",
      keyAction: "Land it soft",
      icon: "pitch",
      difficulty: "Medium",
      timeToRead: "35s",
      clubAdjustment: "Pitching or sand wedge",
      ballPosition: "Center of stance",
      stance: "Slightly open",
      swingThoughts: ["Accelerate through", "High trajectory", "Soft landing"],
      memorableQuote: "Like tossing a ball underhand - up and soft.",
      proTip: "Rhythm is more important than power"
    },
    {
      id: 25,
      name: "Flop Shot",
      category: "short",
      quickTip: "Open face, full swing",
      situation: "Short sided with little green to work with",
      keyAction: "Hit it high and soft",
      icon: "flop",
      difficulty: "Expert",
      timeToRead: "50s",
      clubAdjustment: "Lob wedge wide open",
      ballPosition: "Forward in stance",
      stance: "Very open, aim left",
      swingThoughts: ["Face wide open", "Full swing", "Slide under ball"],
      memorableQuote: "Like hitting a fried egg with a spatula - slide under and pop it up.",
      proTip: "Only attempt with a lie that allows clean contact"
    },
    {
      id: 26,
      name: "Bump and Run",
      category: "short",
      quickTip: "Low, rolling shot",
      situation: "Lots of green to work with, firm conditions",
      keyAction: "Get it rolling early",
      icon: "bumpAndRun",
      difficulty: "Easy",
      timeToRead: "20s",
      clubAdjustment: "5-8 iron",
      ballPosition: "Back of stance",
      stance: "Narrow, weight left",
      swingThoughts: ["Keep it low", "Let it run", "Like a long putt"],
      memorableQuote: "Old Scottish style - bump it into the hill and let it run down.",
      proTip: "Great shot for windy conditions"
    },
    {
      id: 27,
      name: "Bellied Wedge",
      category: "short",
      quickTip: "Leading edge contact",
      situation: "Ball against collar or in light rough",
      keyAction: "Hit with leading edge",
      icon: "belliedWedge",
      difficulty: "Hard",
      timeToRead: "40s",
      clubAdjustment: "Sand or gap wedge",
      ballPosition: "Center of stance",
      stance: "Putting stance",
      swingThoughts: ["Leading edge only", "Putting stroke", "Don't dig"],
      memorableQuote: "Like putting with a wedge - catch it on the equator.",
      proTip: "Great when you can't get putter on ball cleanly"
    },
    {
      id: 28,
      name: "Texas Wedge",
      category: "short",
      quickTip: "Putter from off green",
      situation: "Ball off green but good path to hole",
      keyAction: "Putt it from anywhere",
      icon: "texasWedge",
      difficulty: "Easy",
      timeToRead: "15s",
      clubAdjustment: "Putter",
      ballPosition: "Normal putting position",
      stance: "Normal putting stance",
      swingThoughts: ["Extra distance", "Firm stroke", "Account for fringe"],
      memorableQuote: "When in doubt, putt it out - even from 40 yards.",
      proTip: "Great option when chipping is risky"
    },

    // WIND CATEGORY
    {
      id: 29,
      name: "Into the Wind",
      category: "wind",
      quickTip: "Club up, ball back",
      situation: "Strong wind blowing toward you",
      keyAction: "Keep ball flight low",
      icon: "intoWind",
      difficulty: "Medium",
      timeToRead: "30s",
      clubAdjustment: "+2-3 clubs",
      ballPosition: "Back in stance",
      stance: "Weight forward, narrow",
      swingThoughts: ["Keep it low", "Extra club", "Smooth tempo"],
      memorableQuote: "When it's breezy, swing easy - let the extra club do the work.",
      proTip: "Ball will stop quickly on landing"
    },
    {
      id: 30,
      name: "With the Wind",
      category: "wind",
      quickTip: "Club down, control trajectory",
      situation: "Strong wind blowing behind you",
      keyAction: "Control the distance",
      icon: "withWind",
      difficulty: "Hard",
      timeToRead: "35s",
      clubAdjustment: "-1-2 clubs",
      ballPosition: "Normal or slightly forward",
      stance: "Balanced setup",
      swingThoughts: ["Less club", "Control trajectory", "Plan for extra roll"],
      memorableQuote: "Helping wind is tricky - don't let it help too much.",
      proTip: "Ball will fly farther and roll more"
    },
    {
      id: 31,
      name: "Crosswind Left to Right",
      category: "wind",
      quickTip: "Aim left, expect drift",
      situation: "Wind blowing from left to right",
      keyAction: "Aim into the wind",
      icon: "crosswindLeft",
      difficulty: "Medium",
      timeToRead: "30s",
      clubAdjustment: "Normal club",
      ballPosition: "Normal position",
      stance: "Aim left of target",
      swingThoughts: ["Aim left", "Expect drift", "Commit to line"],
      memorableQuote: "Aim for the wind to bring it back - trust the drift.",
      proTip: "Amount of drift depends on ball height"
    },
    {
      id: 32,
      name: "Crosswind Right to Left",
      category: "wind",
      quickTip: "Aim right, expect drift",
      situation: "Wind blowing from right to left",
      keyAction: "Aim into the wind",
      icon: "crosswindRight",
      difficulty: "Medium",
      timeToRead: "30s",
      clubAdjustment: "Normal club",
      ballPosition: "Normal position",
      stance: "Aim right of target",
      swingThoughts: ["Aim right", "Expect drift", "Trust the wind"],
      memorableQuote: "Let Mother Nature be your caddie - she'll steer it home.",
      proTip: "Lower shots drift less than high shots"
    },
    {
      id: 33,
      name: "Swirling Wind",
      category: "wind",
      quickTip: "Play conservatively",
      situation: "Wind changing direction constantly",
      keyAction: "Take the safe play",
      icon: "swirlingWind",
      difficulty: "Hard",
      timeToRead: "40s",
      clubAdjustment: "Extra club for safety",
      ballPosition: "Back in stance",
      stance: "Stable, balanced",
      swingThoughts: ["Play safe", "Low trajectory", "Center of green"],
      memorableQuote: "When the wind can't make up its mind, play for the middle.",
      proTip: "Wait for a lull if possible"
    },

    // WEATHER CONDITIONS - Enhanced from Reference Image 8
    {
      id: 44,
      name: "Weather - Fairway Bunkers Rough",
      category: "weather",
      quickTip: "If wind is behind you, open club face a little",
      situation: "Playing from fairway bunkers in windy conditions",
      keyAction: "Whatever you play, ball slightly more forward than normal",
      icon: "wind",
      difficulty: "Expert",
      timeToRead: "45s",
      clubAdjustment: "If wind is forward at you, close club slightly",
      ballPosition: "Ball slightly more forward than normal",
      stance: "Whatever the shot, play ball further back",
      swingThoughts: ["2 clubs longer than usual", "Hit your shots and run to the side", "Drift wrist action helps"],
      memorableQuote: "Wind is the golfer's invisible opponent - respect it and use it wisely.",
      proTip: "Crosswind: Use a less lofted club than usual"
    },
    {
      id: 45,
      name: "Wet Grounds Conditions",
      category: "weather",
      quickTip: "Always hit ball to fly not turf",
      situation: "Course conditions are wet and soft",
      keyAction: "Try to hit just below center of ball",
      icon: "water",
      difficulty: "Medium",
      timeToRead: "35s",
      clubAdjustment: "Swing in upright vertical fashion",
      ballPosition: "Club face open, before center line",
      stance: "Normal stance with attention to footing",
      swingThoughts: ["Hit just below center", "Upright swing", "All carry, no roll"],
      memorableQuote: "Wet conditions demand precision - hit it crisp and let it fly.",
      proTip: "No roll expected - plan for all carry distance"
    },
    {
      id: 46,
      name: "High Grass Conditions",
      category: "weather",
      quickTip: "Swing in upright vertical fashion with club face open",
      situation: "Ball sitting in thick rough or high grass",
      keyAction: "Open club face, swing upright",
      icon: "grass",
      difficulty: "Hard",
      timeToRead: "40s",
      clubAdjustment: "Higher lofted club, open face",
      ballPosition: "Before center line",
      stance: "Stable base, open club face",
      swingThoughts: ["Open club face", "Upright swing", "Hit through grass"],
      memorableQuote: "High grass calls for aggressive, upright action - commit to the swing.",
      proTip: "Open face helps cut through grass and gets ball airborne"
    }
  ];

  // Complete fundamentals data with all 10 entries
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

  // Complete putting mastery data
  const puttingMasteryData = {
    sections: [
      {
        id: "situations",
        name: "Putting Situations",
        icon: "putting",
        description: "Master every type of putt on the course",
        items: [
          {
            id: 1,
            name: "Straight Putt",
            quickTip: "Square face, smooth stroke",
            situation: "Ball directly in line with hole",
            keyAction: "Keep putter face square",
            difficulty: "Easy",
            timeToRead: "20s",
            setup: "Eyes over ball, shoulder-width stance",
            technique: "Pendulum motion, equal back and through",
            commonMistakes: ["Peeking too early", "Decelerating", "Moving head"],
            practiceNote: "Use alignment sticks to check square face",
            mentalCue: "Like a pendulum clock - smooth and rhythmic",
            memorableQuote: "Straight putts are about trust - trust your read, trust your stroke, trust the ball to go in."
          },
          {
            id: 2,
            name: "Uphill Putt",
            quickTip: "Hit it firmer, less break",
            situation: "Putting uphill to the hole",
            keyAction: "Add speed for slope",
            difficulty: "Medium",
            timeToRead: "25s",
            setup: "Slightly more forward ball position",
            technique: "Firmer stroke, ball will slow down quickly",
            commonMistakes: ["Leaving it short", "Not trusting the firm stroke"],
            practiceNote: "Practice with tees to feel uphill resistance",
            mentalCue: "Uphill putts need help - give them energy",
            memorableQuote: "Uphill putts are like running uphill - you need more energy to get there."
          },
          {
            id: 3,
            name: "Downhill Putt",
            quickTip: "Gentle touch, more break",
            situation: "Putting downhill to the hole",
            keyAction: "Control speed carefully",
            difficulty: "Hard",
            timeToRead: "30s",
            setup: "Ball slightly back, lighter grip pressure",
            technique: "Shorter backstroke, gentle follow-through",
            commonMistakes: ["Hitting too hard", "Not reading enough break"],
            practiceNote: "Practice with different slopes to feel speed control",
            mentalCue: "Let gravity help - just give it a nudge",
            memorableQuote: "Downhill putts are like rolling a ball down a hill - let the slope do the work."
          },
          {
            id: 4,
            name: "Breaking Putt",
            quickTip: "Aim for the apex, trust the break",
            situation: "Significant left or right break",
            keyAction: "Pick your line and commit",
            difficulty: "Medium",
            timeToRead: "35s",
            setup: "Align body to start line, not hole",
            technique: "Stroke straight along your chosen line",
            commonMistakes: ["Aiming at the hole", "Steering the putt", "Not committing to line"],
            practiceNote: "Use tees to mark your intended line",
            mentalCue: "Pick your highway and drive straight down it",
            memorableQuote: "Breaking putts are about faith - believe in your line and let the slope bring it home."
          },
          {
            id: 5,
            name: "Long Putt (Lag)",
            quickTip: "Focus on distance, not direction",
            situation: "30+ foot putts for two-putt",
            keyAction: "Get it close for easy second putt",
            difficulty: "Medium",
            timeToRead: "25s",
            setup: "Wider stance for stability",
            technique: "Longer, rhythmic stroke focusing on pace",
            commonMistakes: ["Trying to make it", "Poor distance control", "Leaving short"],
            practiceNote: "Practice to 3-foot circle around hole",
            mentalCue: "Roll it into a garage door - big target, right speed",
            memorableQuote: "Lag putts are about getting close enough to high-five the hole on the next one."
          },
          {
            id: 6,
            name: "Short Putt (Must Make)",
            quickTip: "Confident stroke, firm pace",
            situation: "3-6 foot putts you have to make",
            keyAction: "Be aggressive and decisive",
            difficulty: "Hard",
            timeToRead: "30s",
            setup: "Eyes directly over ball, narrow stance",
            technique: "Firm stroke, ball hits back of cup",
            commonMistakes: ["Tentative stroke", "Peeking", "Overthinking"],
            practiceNote: "Practice until you make 10 in a row",
            mentalCue: "Attack the hole - be the hunter, not the hunted",
            memorableQuote: "Short putts are about confidence - see it going in before you even stroke it."
          }
        ]
      },
      {
        id: "reading",
        name: "Green Reading",
        icon: "eye",
        description: "See slopes and breaks like a pro",
        items: [
          {
            id: 1,
            name: "Basic Slope Reading",
            description: "How to see the slope and break",
            keyPoints: [
              "Walk around the putt to see from different angles",
              "Look from behind the ball and behind the hole",
              "Check from the low side - breaks are most visible",
              "Use your feet to feel the slope as you walk"
            ],
            technique: "Stand behind ball, crouch down to ball level, visualize water flowing",
            commonErrors: ["Only reading from one angle", "Not feeling with feet"],
            proTip: "The break is usually most visible from the low side of the putt",
            mentalCue: "Imagine pouring water - which way would it flow?",
            memorableQuote: "Read greens like a detective - gather clues from every angle."
          },
          {
            id: 2,
            name: "Grain Reading",
            description: "Understanding grass grain effects",
            keyPoints: [
              "Shiny grass = with the grain (faster)",
              "Dull grass = against the grain (slower)",
              "Grain usually grows toward water/setting sun",
              "More effect on slower putts"
            ],
            technique: "Look at grass color and sheen around hole",
            commonErrors: ["Ignoring grain effects", "Overcompensating for grain"],
            proTip: "Grain has more effect on speed than direction",
            mentalCue: "Shiny hair, fast ride - dull hair, slow ride",
            memorableQuote: "Grain is the green's personality - learn to read its mood."
          },
          {
            id: 3,
            name: "Plumb Bobbing",
            description: "Using putter to read slope",
            keyPoints: [
              "Hold putter vertically at arm's length",
              "Align putter shaft with ball and hole",
              "See which side of hole is visible",
              "Ball will break toward visible side"
            ],
            technique: "Use dominant eye, hold putter lightly, trust what you see",
            commonErrors: ["Using wrong eye", "Holding putter crooked"],
            proTip: "Works best on subtle breaks you can't easily see",
            mentalCue: "Let the putter be your compass - it knows the way",
            memorableQuote: "Plumb bobbing is like asking the earth itself which way the ball will roll."
          },
          {
            id: 4,
            name: "Overall Green Slope",
            description: "Reading the big picture",
            keyPoints: [
              "Look at mountains, water, overall land slope",
              "Putts generally break toward water",
              "Higher ground creates natural drainage",
              "Trust the obvious when in doubt"
            ],
            technique: "Step back and see the whole green in context",
            commonErrors: ["Focusing only on immediate area", "Overthinking subtle reads"],
            proTip: "When in doubt, trust the overall slope of the land",
            mentalCue: "Think like a river - where would the water naturally flow?",
            memorableQuote: "Mother Nature doesn't lie - trust the big picture slope."
          }
        ]
      },
      {
        id: "distance",
        name: "Distance Control",
        icon: "ruler",
        description: "Master pace and speed for perfect distance",
        items: [
          {
            id: 1,
            name: "Clock System",
            description: "Use backswing length to control distance",
            keyPoints: [
              "6 o'clock = short putts (3-6 feet)",
              "7 o'clock = medium putts (6-15 feet)",
              "8 o'clock = long putts (15-30 feet)",
              "Keep follow-through equal to backswing"
            ],
            technique: "Practice with consistent tempo, varying only length",
            commonErrors: ["Varying tempo", "Unequal backswing/follow-through"],
            proTip: "Tempo stays same, only length changes",
            mentalCue: "Think metronome - same beat, different reach",
            memorableQuote: "The clock never changes its rhythm, only how far it swings."
          },
          {
            id: 2,
            name: "Pace Putting",
            description: "Focus on rolling speed rather than distance",
            keyPoints: [
              "Visualize ball rolling at perfect speed",
              "Ball should just die at the hole",
              "Too fast = less chance to go in",
              "Perfect pace holds the line better"
            ],
            technique: "Practice rolling balls by hand to feel perfect pace",
            commonErrors: ["Hitting too hard", "Leaving putts short"],
            proTip: "Perfect pace = ball drops in front half of cup",
            mentalCue: "Roll it like it's going to stop and knock on the door",
            memorableQuote: "Perfect pace is like a gentle knock - firm enough to be heard, soft enough to be welcome."
          },
          {
            id: 3,
            name: "Ladder Drill System",
            description: "Progressive distance control training",
            keyPoints: [
              "Set up putts at 10, 20, 30, 40 foot intervals",
              "Try to stop each ball at its distance marker",
              "Focus on consistent acceleration",
              "Build muscle memory for different distances"
            ],
            technique: "Start close and work progressively longer",
            commonErrors: ["Inconsistent tempo", "Not following through"],
            proTip: "Practice this before every round",
            mentalCue: "Each rung needs its own energy - calibrate your power",
            memorableQuote: "Distance control is like tuning an instrument - each note needs its own pressure."
          }
        ]
      },
      {
        id: "practice",
        name: "Practice Routines",
        icon: "target",
        description: "Structured practice for rapid improvement",
        items: [
          {
            id: 1,
            name: "Gate Drill",
            description: "Improve stroke path and accuracy",
            setup: "Place two tees just wider than putter head, 6 inches from ball",
            objective: "Stroke through gate without touching tees",
            progression: "Start slow, build to normal speed, vary distances",
            benefits: ["Straight stroke path", "Consistent face angle", "Confidence"],
            frequency: "5 minutes daily",
            mentalCue: "Thread the needle with every stroke",
            memorableQuote: "The gate teaches your putter to walk a straight line every time."
          },
          {
            id: 2,
            name: "Circle Drill",
            description: "Build confidence on short putts",
            setup: "Place 8 balls in circle around hole at 3-foot radius",
            objective: "Make all 8 putts in a row",
            progression: "Start at 2 feet, move to 3 feet, then 4 feet",
            benefits: ["Short putt confidence", "Pre-round preparation", "Pressure handling"],
            frequency: "Before every round",
            mentalCue: "Surround the hole with success",
            memorableQuote: "When you own the circle, you own the confidence to attack any putt."
          },
          {
            id: 3,
            name: "Lag Ladder",
            description: "Master long putt distance control",
            setup: "Putt to 20, 30, 40, 50 foot targets",
            objective: "Get each putt within 3-foot circle",
            progression: "Increase distances gradually, add breaking putts",
            benefits: ["Distance control", "Green reading", "Course management"],
            frequency: "Weekly practice session",
            mentalCue: "Paint the distance with your stroke",
            memorableQuote: "Lag putting is about getting close enough to whisper sweet nothings to the hole."
          },
          {
            id: 4,
            name: "Pressure Cooker",
            description: "Practice under pressure",
            setup: "Must make 5 putts in a row from different distances/angles",
            objective: "Build mental toughness and focus",
            progression: "Start with easier putts, increase difficulty",
            benefits: ["Mental toughness", "Focus under pressure", "Routine consistency"],
            frequency: "Weekly mental training",
            mentalCue: "Thrive when it matters most",
            memorableQuote: "Pressure is a privilege - it means you're in position to succeed."
          },
          {
            id: 5,
            name: "Putting Fundamentals Checklist",
            description: "12-point fundamentals from reference guide",
            setup: "Review before every round and practice session",
            objective: "Master the fundamentals that prevent putting problems",
            checkpoints: [
              "1. Correct grip, hands in front of ball",
              "2. Firm left hand grip at top of swing",
              "3. Left arm extended and not collapsing",
              "4. Turning of hips and not swaying",
              "5. Keeping head steady and not lifting up",
              "6. Standing upright and slightly flexing knees",
              "7. Stance proper with good torso balance and weight on left side",
              "8. Good arms and hands action follow through",
              "9. Keeping swing in smooth rhythm",
              "10. Bending or stooping severely in stance",
              "11. Do not reach out or stand too far away from ball",
              "12. Never fear your shots, regardless of who is watching"
            ],
            problems: [
              "SLICING - Not staying with fundamentals",
              "PULLING - Bad grip position",
              "HOOKING - Standing too close",
              "SHANKING - Ball position incorrect",
              "TOPPING - Head movement",
              "SKYING - Setup issues"
            ],
            frequency: "Before every round",
            mentalCue: "Fundamentals prevent problems - master the basics",
            memorableQuote: "Take that deep breath, relax, no tension and swing with good speed tempo and rhythm. Never rush a shot, life is too short."
          }
        ]
      },
      {
        id: "mental",
        name: "Mental Game",
        icon: "brain",
        description: "Master the mind game of putting",
        items: [
          {
            id: 1,
            name: "Visualization",
            description: "See the putt before you stroke it",
            technique: "Stand behind ball, visualize perfect roll and ball dropping",
            keyPoints: [
              "See the entire ball path in your mind",
              "Hear the sound of ball dropping",
              "Feel the successful stroke",
              "Trust your first read"
            ],
            practice: "Visualize every practice putt going in",
            mentalCue: "Movie preview of success - watch your ball go in",
            memorableQuote: "What the mind can see and believe, the hands can achieve."
          },
          {
            id: 2,
            name: "Routine Consistency",
            description: "Same routine builds confidence",
            steps: [
              "Read putt from behind ball",
              "Take practice stroke looking at hole",
              "Set up to ball with one look",
              "Stroke with confidence"
            ],
            keyPoints: [
              "Same routine every time",
              "Don't rush under pressure",
              "Trust your read",
              "Commit to your decision"
            ],
            practice: "Use routine on every practice putt",
            mentalCue: "Routine is your security blanket - wrap yourself in it",
            memorableQuote: "Champions don't have better hands, they have better habits."
          },
          {
            id: 3,
            name: "Positive Self-Talk",
            description: "Control your inner voice",
            technique: "Replace negative thoughts with positive affirmations",
            examples: [
              "Instead of 'Don't miss' think 'Roll it in'",
              "Instead of 'This is hard' think 'I've made this before'",
              "Instead of 'What if I miss' think 'I see it going in'"
            ],
            practice: "Monitor and correct thoughts during practice",
            mentalCue: "Be your own best caddie - encouraging and confident",
            memorableQuote: "Your mind is either your best friend or worst enemy on the greens - choose wisely."
          },
          {
            id: 4,
            name: "Focus Techniques",
            description: "Stay present and focused",
            techniques: [
              "Pick a specific spot on ball to focus on",
              "Count dimples or focus on logo",
              "Use breathing to calm nerves",
              "Stay in present moment"
            ],
            keyPoints: [
              "Don't think about results",
              "Focus on process",
              "One putt at a time",
              "Stay relaxed"
            ],
            practice: "Practice focus techniques during pressure situations",
            mentalCue: "Narrow your world to just this putt, this moment",
            memorableQuote: "Focus is like a laser - the more concentrated, the more powerful."
          }
        ]
      },
      {
        id: "equipment",
        name: "Equipment Guide",
        icon: "golf",
        description: "Choose and maintain your putting tools",
        items: [
          {
            id: 1,
            name: "Putter Selection",
            description: "Find the right putter for your stroke",
            types: [
              "Blade putters - traditional feel, better for straight strokes",
              "Mallet putters - more forgiving, better for arc strokes",
              "Face-balanced - for straight back-straight through strokes",
              "Toe-hanging - for arc strokes"
            ],
            fitting: [
              "Length should allow comfortable posture",
              "Weight should feel balanced in your hands",
              "Alignment aids should help you see target line",
              "Try before you buy - feel is most important"
            ],
            mentalCue: "Your putter should feel like an extension of your hands",
            memorableQuote: "The best putter is the one that gives you confidence to stroke it boldly."
          },
          {
            id: 2,
            name: "Ball Selection for Putting",
            description: "How ball choice affects putting",
            considerations: [
              "Softer balls - better feel, more control",
              "Harder balls - more distance, less feel",
              "Dimple pattern affects roll characteristics",
              "Consistency matters more than brand"
            ],
            recommendation: "Use same ball type for all practice and play",
            testing: "Practice with different balls to find preference",
            mentalCue: "Know your ball like you know your putter",
            memorableQuote: "A consistent ball choice creates consistent results and confident strokes."
          },
          {
            id: 3,
            name: "Green Maintenance",
            description: "Reading and adapting to green conditions",
            factors: [
              "Grass type affects speed and break",
              "Time of day affects green speed",
              "Weather conditions change putting",
              "Recent maintenance affects roll"
            ],
            adaptation: [
              "Early morning - slower greens",
              "Afternoon - faster greens",
              "Wet conditions - slower, less break",
              "Wind affects ball movement"
            ],
            mentalCue: "Read the green's mood and adjust accordingly",
            memorableQuote: "Greens are living, breathing surfaces - learn to speak their language."
          }
        ]
      },
      {
        id: "troubleshooting",
        name: "Troubleshooting",
        icon: "wrench",
        description: "Fix common putting problems",
        items: [
          {
            id: 1,
            name: "Missing Short Putts",
            symptoms: ["Missing 3-6 foot putts consistently", "Losing confidence on short ones"],
            causes: ["Peeking too early", "Tentative stroke", "Poor alignment", "Overthinking"],
            fixes: [
              "Keep head still until ball is gone",
              "Make decisive, confident strokes",
              "Use alignment aids in practice",
              "Develop consistent routine"
            ],
            practice: "Circle drill - make 10 three-footers in a row daily",
            mentalCue: "Short putts are about execution, not perfection",
            memorableQuote: "Short putts are made with confidence, not hope."
          },
          {
            id: 2,
            name: "Poor Distance Control",
            symptoms: ["Constantly three-putting", "Leaving long putts short or long"],
            causes: ["Inconsistent tempo", "Poor green reading", "Wrong technique"],
            fixes: [
              "Practice clock system for consistent distances",
              "Focus on pace rather than line",
              "Use same tempo for all putts",
              "Practice lag putting regularly"
            ],
            practice: "Ladder drill - putt to different distances daily",
            mentalCue: "Distance is about rhythm, not strength",
            memorableQuote: "Good distance control turns three-putts into tap-ins."
          },
          {
            id: 3,
            name: "Reading Greens Poorly",
            symptoms: ["Missing breaks consistently", "Surprised by ball movement"],
            causes: ["Not walking around putt", "Rushing read", "Ignoring obvious slope"],
            fixes: [
              "Always read from multiple angles",
              "Trust your first instinct",
              "Feel slope with your feet",
              "Practice on different green types"
            ],
            practice: "Play different courses to experience various green conditions",
            mentalCue: "The green tells its story - you just need to listen",
            memorableQuote: "Green reading is an art - the more you practice, the better your canvas."
          },
          {
            id: 4,
            name: "Putting Under Pressure",
            symptoms: ["Making practice putts but missing in rounds", "Nerves affecting stroke"],
            causes: ["Different routine under pressure", "Negative thoughts", "Fear of missing"],
            fixes: [
              "Stick to same routine regardless of pressure",
              "Practice positive self-talk",
              "Focus on process, not results",
              "Create pressure in practice"
            ],
            practice: "Pressure cooker drill - must make putts to 'win'",
            mentalCue: "Pressure is an honor - embrace the opportunity",
            memorableQuote: "Champions put like they practice and practice like they put - no difference."
          }
        ]
      }
    ]
  };

  const shotCategories = [
    { id: "all", name: "All", icon: "golf" },
    { id: "fairway", name: "Fairway", icon: "golf" },
    { id: "sand", name: "Sand", icon: "bunker" }, 
    { id: "chip", name: "Chip", icon: "chip" },
    { id: "sidehill", name: "Sidehill", icon: "ballAbove" },
    { id: "weather", name: "Weather", icon: "wind" },
    { id: "lies", name: "Bad Lies", icon: "uphill" },
    { id: "bunker", name: "Bunkers", icon: "bunker" },
    { id: "trouble", name: "Trouble", icon: "underTrees" },
    { id: "wind", name: "Wind", icon: "withWind" },
    { id: "shots", name: "Shots", icon: "target" },
    { id: "short", name: "Short Game", icon: "putting" }
  ];

  // Filtered shots based on search and category
  const filteredShots = shotData.filter(shot => {
    const matchesSearch = searchTerm === "" || 
      shot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shot.quickTip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shot.situation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "" || selectedCategory === "all" || shot.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get club recommendation
  const getClubRecommendation = (distance, windSpeed = 0, windDirection = "none") => {
    let adjustedDistance = distance;
    
    if (windDirection === "into") {
      adjustedDistance += windSpeed * 1.5;
    } else if (windDirection === "with") {
      adjustedDistance -= windSpeed * 1.0;
    }
    
    const clubs = Object.entries(personalSettings.distances);
    let bestClub = clubs[0];
    let smallestDiff = Math.abs(clubs[0][1] - adjustedDistance);
    
    clubs.forEach(([club, dist]) => {
      const diff = Math.abs(dist - adjustedDistance);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        bestClub = [club, dist];
      }
    });
    
    return {
      club: bestClub[0],
      distance: bestClub[1],
      adjustment: adjustedDistance - distance
    };
  };

  // Distance management functions
  const startEditingDistances = () => {
    setTempDistances({ ...personalSettings.distances });
    setEditingDistances(true);
  };

  const saveDistances = () => {
    setPersonalSettings(prev => ({ ...prev, distances: tempDistances }));
    setEditingDistances(false);
    setTempDistances({});
  };

  const cancelEditingDistances = () => {
    setEditingDistances(false);
    setTempDistances({});
  };

  const updateTempDistance = (club, value) => {
    setTempDistances(prev => ({ ...prev, [club]: parseInt(value) || 0 }));
  };

  // Round management functions
  const addRound = () => {
    if (!newRound.course || !newRound.score) return;
    
    const round = {
      ...newRound,
      id: Date.now(),
      score: parseInt(newRound.score),
      front9: parseInt(newRound.front9) || 0,
      back9: parseInt(newRound.back9) || 0,
      fairways: parseInt(newRound.fairways) || 0,
      gir: parseInt(newRound.gir) || 0,
      totalPutts: parseInt(newRound.totalPutts) || 0,
      threePutts: parseInt(newRound.threePutts) || 0
    };
    
    setRounds(prev => [round, ...prev]);
    setShowAddRound(false);
    setNewRound({
      course: "",
      date: new Date().toISOString().split('T')[0],
      score: "",
      par: 72,
      front9: "",
      back9: "",
      fairways: "",
      fairwaysTotal: 14,
      gir: "",
      girTotal: 18,
      totalPutts: "",
      threePutts: "",
      bestHoles: "",
      worstHoles: "",
      mentalNotes: "",
      conditions: ""
    });
  };

  const deleteRound = (id) => {
    setRounds(prev => prev.filter(round => round.id !== id));
  };

  // Ball selection system data
  const ballSelectionData = {
    wizard: {
      questions: [
        {
          id: 1,
          question: "What's your handicap level?",
          options: [
            { value: "beginner", label: "Beginner (25+ handicap)", points: { distance: 3, control: 1, spin: 1 } },
            { value: "intermediate", label: "Intermediate (10-25 handicap)", points: { distance: 2, control: 2, spin: 1 } },
            { value: "advanced", label: "Advanced (5-10 handicap)", points: { distance: 1, control: 2, spin: 2 } },
            { value: "expert", label: "Expert (0-5 handicap)", points: { distance: 1, control: 3, spin: 3 } }
          ]
        },
        {
          id: 2,
          question: "What's your primary goal?",
          options: [
            { value: "distance", label: "Maximum distance", points: { distance: 3, control: 0, spin: 0 } },
            { value: "accuracy", label: "Accuracy and control", points: { distance: 0, control: 3, spin: 1 } },
            { value: "shortgame", label: "Short game performance", points: { distance: 0, control: 1, spin: 3 } },
            { value: "balanced", label: "Balanced performance", points: { distance: 1, control: 1, spin: 1 } }
          ]
        },
        {
          id: 3,
          question: "What's your swing speed?",
          options: [
            { value: "slow", label: "Slow (under 90 mph)", points: { distance: 2, control: 1, spin: 0 } },
            { value: "average", label: "Average (90-105 mph)", points: { distance: 1, control: 1, spin: 1 } },
            { value: "fast", label: "Fast (105+ mph)", points: { distance: 0, control: 1, spin: 2 } }
          ]
        },
        {
          id: 4,
          question: "What course conditions do you play most?",
          options: [
            { value: "soft", label: "Soft conditions (wet, receptive)", points: { distance: 1, control: 1, spin: 1 } },
            { value: "firm", label: "Firm conditions (dry, bouncy)", points: { distance: 2, control: 1, spin: 0 } },
            { value: "windy", label: "Windy conditions", points: { distance: 0, control: 2, spin: 1 } },
            { value: "mixed", label: "Mixed conditions", points: { distance: 1, control: 1, spin: 1 } }
          ]
        },
        {
          id: 5,
          question: "What's your budget priority?",
          options: [
            { value: "budget", label: "Budget-friendly", points: { distance: 1, control: 1, spin: 0 } },
            { value: "mid", label: "Mid-range performance", points: { distance: 1, control: 1, spin: 1 } },
            { value: "premium", label: "Premium performance", points: { distance: 0, control: 1, spin: 2 } }
          ]
        }
      ]
    },
    recommendations: {
      distance: {
        name: "Distance Ball",
        description: "Maximize your driving distance",
        characteristics: ["Hard compression", "Low spin off driver", "Penetrating ball flight", "Less greenside spin"],
        bestFor: ["Longer hitters", "Firm course conditions", "Golfers who prioritize distance"],
        examples: ["Titleist Pro V1x", "Callaway Chrome Soft X", "TaylorMade TP5x"],
        icon: "fire"
      },
      control: {
        name: "Control Ball",
        description: "Balance of distance and accuracy",
        characteristics: ["Medium compression", "Balanced spin rates", "Consistent ball flight", "Good greenside feel"],
        bestFor: ["Most golfers", "Variable conditions", "Balanced approach to game"],
        examples: ["Titleist Pro V1", "Callaway Chrome Soft", "TaylorMade TP5"],
        icon: "target"
      },
      spin: {
        name: "Spin Ball", 
        description: "Maximum short game control",
        characteristics: ["Soft compression", "High spin around greens", "Soft feel", "Enhanced stopping power"],
        bestFor: ["Advanced players", "Soft conditions", "Short game specialists"],
        examples: ["Titleist Pro V1", "Srixon Z-Star", "Bridgestone Tour B XS"],
        icon: "snowflake"
      }
    },
    quickPicker: [
      {
        playerType: "Beginner",
        description: "New to golf, learning basics",
        recommendation: "distance",
        reasoning: "Focus on distance to build confidence, forgiving compression",
        ballSuggestion: "Two-piece distance ball"
      },
      {
        playerType: "Weekend Warrior",
        description: "Casual player, occasional rounds",
        recommendation: "control",
        reasoning: "Balanced performance for varying skill level and conditions",
        ballSuggestion: "Multi-layer tour ball"
      },
      {
        playerType: "Serious Amateur",
        description: "Regular player, competitive golfer", 
        recommendation: "control",
        reasoning: "Consistency and versatility for competitive play",
        ballSuggestion: "Premium tour ball"
      },
      {
        playerType: "Low Handicapper",
        description: "Skilled player, single digit handicap",
        recommendation: "spin",
        reasoning: "Maximum control around greens, shot shaping ability",
        ballSuggestion: "Tour-level spin ball"
      }
    ],
    mixedBallSystem: {
      identification: [
        {
          situation: "Found ball with unknown specs",
          tests: [
            "Compression test: Squeeze firmly - soft/medium/hard feel",
            "Drop test: From shoulder height - high/medium/low bounce",
            "Visual inspection: Look for 'distance' or 'tour' markings"
          ],
          guidelines: "Use for practice rounds or non-competitive play"
        }
      ],
      management: {
        strategy: "Organize by ball type for different situations",
        tips: [
          "Keep distance balls for tee shots on long holes",
          "Save spin balls for approach shots and short game",
          "Use practice balls for warm-up and range sessions",
          "Mark your preferred ball type for easy identification"
        ]
      }
    }
  };

  // Ball selection state
  const [showBallSelection, setShowBallSelection] = useState(false);
  const [ballWizardStep, setBallWizardStep] = useState(0);
  const [ballWizardAnswers, setBallWizardAnswers] = useState({});
  const [ballRecommendation, setBallRecommendation] = useState(null);

  // Ball selection functions
  const calculateBallRecommendation = (answers) => {
    const totals = { distance: 0, control: 0, spin: 0 };
    
    Object.values(answers).forEach(answer => {
      if (answer?.points) {
        totals.distance += answer.points.distance || 0;
        totals.control += answer.points.control || 0;
        totals.spin += answer.points.spin || 0;
      }
    });
    
    const maxCategory = Object.entries(totals).reduce((a, b) => 
      totals[a[0]] > totals[b[0]] ? a : b
    )[0];
    
    return ballSelectionData.recommendations[maxCategory];
  };

  const handleWizardAnswer = (questionId, option) => {
    const newAnswers = { ...ballWizardAnswers, [questionId]: option };
    setBallWizardAnswers(newAnswers);
    
    if (ballWizardStep < ballSelectionData.wizard.questions.length - 1) {
      setBallWizardStep(ballWizardStep + 1);
    } else {
      // Calculate recommendation
      const recommendation = calculateBallRecommendation(newAnswers);
      setBallRecommendation(recommendation);
    }
  };

  const resetBallWizard = () => {
    setBallWizardStep(0);
    setBallWizardAnswers({});
    setBallRecommendation(null);
  };

  const tabs = [
    // Page Curl Experiences - Pro Tour Yardage Book Feel
    { id: "shots", name: "Shots", icon: FaBullseye },
    { id: "putting", name: "Putting", icon: FaGolfBall },
    { id: "learn", name: "Learn", icon: FaBook },
    // Interactive Tools - Different Experiences
    { id: "calculator", name: "Distance", icon: FaCalculator },
    { id: "ballselection", name: "Balls", icon: TbGolf },
    { id: "mydata", name: "Data", icon: FaUser }
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Spiral Binding - Always visible at very top */}
      <div className="fixed top-0 left-0 right-0 z-50 spiral-binding">
        <div className="spiral-holes">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="spiral-hole"></div>
          ))}
        </div>
      </div>

      {/* Shots Tab - Page Curl with Comprehensive Content */}
      {activeTab === "shots" && (
        <div className="fixed inset-0 top-16 bottom-24 z-20">
          <ContextAwarePageCurl 
            tabId="shots"
            tabName="Shot Selection"
            tabIcon={FaBullseye}
          />
        </div>
      )}

      {/* Putting Tab - Page Curl Experience */}
      {activeTab === "putting" && (
        <div className="fixed inset-0 top-16 bottom-24 z-20">
          <ContextAwarePageCurl 
            tabId="putting"
            tabName="Putting Mastery"
            tabIcon={FaFlag}
          />
        </div>
      )}

      {/* Learn Tab - Page Curl Experience */}
      {activeTab === "learn" && (
        <div className="fixed inset-0 top-16 bottom-24 z-20">
          <ContextAwarePageCurl 
            tabId="learn"
            tabName="Golf Fundamentals"
            tabIcon={FaBook}
          />
        </div>
      )}

      {/* Regular padded content for other tabs - with mobile scrolling */}
      <div className={`fixed inset-0 top-16 bottom-24 overflow-y-auto mobile-scroll ${(activeTab === "shots" || activeTab === "putting" || activeTab === "learn") ? 'hidden' : ''}`}>
        <div className="px-5 py-6 pb-8 golf-spacing">
        {/* Distance Calculator Tab - Full Interactive Version */}
        {activeTab === "calculator" && (
          <div className="space-y-6">
            <div className="learn-page-header">
              <div className="learn-title-section">
                <div className="learn-icon-container">
                  <FaCalculator className="learn-icon golf-icon-bounce" />
                </div>
                <div className="learn-title-content">
                  <h1 className="learn-page-title">Yardage Calculator</h1>
                  <p className="learn-page-subtitle">"Like having a caddie in your pocket"</p>
                </div>
              </div>
              <div className="learn-page-divider"></div>
            </div>
            
            <div className="learn-section key-points-section">
              <div className="learn-section-header">
                <span className="learn-section-icon">📏</span>
                <h3 className="learn-section-title">Distance to Pin</h3>
              </div>
              <div className="space-y-4">
                <input
                  type="number"
                  value={distance === 0 ? "" : distance}
                  onChange={(e) => setDistance(e.target.value === "" ? 0 : parseInt(e.target.value))}
                  className="w-full p-6 border-2 border-leather-brown bg-aged-white rounded-lg text-3xl font-data text-center placeholder-pencil-gray"
                  placeholder="Enter yardage"
                  style={{ color: 'var(--pencil-gray)' }}
                />
                <p className="handwritten-tip font-handwritten text-golf-green text-center">
                  "GPS yardage to pin center - trust your number!"
                </p>
              </div>
            </div>
              
            <div className="learn-section drills-section">
              <div className="learn-section-header">
                <span className="learn-section-icon">💨</span>
                <h3 className="learn-section-title">Wind Conditions</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block font-headers text-golf-green mb-2 text-lg">Wind Direction</label>
                  <select 
                    value={wind}
                    onChange={(e) => setWind(e.target.value)}
                    className="w-full p-4 border-2 border-leather-brown bg-aged-white rounded-lg text-lg font-body"
                    style={{ color: 'var(--pencil-gray)' }}
                  >
                    <option value="none">🌾 Dead Calm</option>
                    <option value="into">⬆️ Into the Wind</option>
                    <option value="with">⬇️ Helping Wind</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-headers text-golf-green mb-2 text-lg">Wind Speed</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={windSpeed === 0 ? "" : windSpeed}
                      onChange={(e) => setWindSpeed(e.target.value === "" ? 0 : parseInt(e.target.value) || 0)}
                      className="w-full p-4 border-2 border-leather-brown bg-aged-white rounded-lg text-lg font-data pr-16"
                      style={{ color: 'var(--pencil-gray)' }}
                      min="0"
                      max="30"
                      disabled={wind === "none"}
                      placeholder="Enter wind speed"
                    />
                    <span className="absolute right-4 top-4 font-body text-pencil-gray text-lg">mph</span>
                  </div>
                </div>
              </div>
            </div>
              
            {wind !== "none" && windSpeed > 0 && (
              <div className="learn-insight-card mental-cue-card">
                <div className="insight-header">
                  <span className="insight-emoji">💨</span>
                  <h4 className="insight-title">Wind Strategy</h4>
                </div>
                <p className="insight-quote memorable">
                  {wind === "into" && windSpeed >= 15 && "\"Strong headwind - take 2-3 more clubs and swing smooth\""}
                  {wind === "into" && windSpeed < 15 && "\"Light headwind - club up one and trust your swing\""}
                  {wind === "with" && windSpeed >= 15 && "\"Strong tailwind - less club, watch the roll out\""}
                  {wind === "with" && windSpeed < 15 && "\"Helping wind - take one less club, normal swing\""}
                </p>
              </div>
            )}
              
            {distance > 0 && (
              <div className="learn-insight-card pro-tip-card">
                <div className="insight-header">
                  <span className="insight-emoji">🏌️</span>
                  <h4 className="insight-title">Club Recommendation</h4>
                </div>
                <div className="text-center space-y-4">
                  <div className="club-recommendation">
                    <div className="text-5xl font-data text-golf-green font-bold mb-2">
                      {getClubRecommendation(distance, windSpeed, wind).club.toUpperCase()}
                    </div>
                    <div className="font-body text-pencil-gray text-lg">
                      Normal carry: <span className="font-data text-golf-green font-semibold">{getClubRecommendation(distance, windSpeed, wind).distance} yards</span>
                    </div>
                    {getClubRecommendation(distance, windSpeed, wind).adjustment !== 0 && (
                      <div className="handwritten-tip font-handwritten text-golf-green mt-3">
                        "Wind effect: {getClubRecommendation(distance, windSpeed, wind).adjustment > 0 ? "+" : ""}{Math.round(getClubRecommendation(distance, windSpeed, wind).adjustment)} yards to account for"
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {distance > 0 && (
              <div className="learn-section mistakes-section">
                <div className="learn-section-header">
                  <span className="learn-section-icon">🎯</span>
                  <h3 className="learn-section-title">Shot Visualization</h3>
                </div>
                <div className="hole-diagram">
                  <div className="hole-fairway">
                    <div className="hole-tee"></div>
                    <div className="hole-green"></div>
                    <div className="hole-flag flag-wave"></div>
                    <div className="yardage-label">{distance}y</div>
                  </div>
                </div>
                <p className="handwritten-tip font-handwritten text-golf-green text-center mt-3">
                  "Account for pin position and green slope - play smart!"
                </p>
              </div>
            )}

            <div className="learn-insight-card mental-cue-card">
              <div className="insight-header">
                <span className="insight-emoji">🎯</span>
                <h4 className="insight-title">Mental Game</h4>
              </div>
              <p className="insight-quote memorable">
                "Trust your yardage and commit to the swing - doubt leads to poor contact"
              </p>
            </div>
          </div>
        )}

        {/* Putting Tab - now using the same page-curl experience as shots */}

        {/* Ball Selection Tab */}
        {activeTab === "ballselection" && (
          <div className="space-y-6">
            <div className="course-header text-center">
              <TbGolf className="text-4xl mb-2 mx-auto golf-icon-bounce" />
              <h2 className="text-2xl font-serif">Smart Ball Selection</h2>
              <p className="font-handwritten text-sm opacity-90 mt-1">"The right ball for your game"</p>
            </div>

            {/* Ball Selection Options */}
            <div className="space-y-4">
              {/* Quick Picker */}
              <div className="golf-card-stack">
                <h3 className="text-xl font-serif font-bold mb-4" style={{ color: 'var(--leather-brown-dark)' }}>Quick Picker</h3>
                <p className="font-serif mb-4" style={{ color: 'var(--leather-brown-medium)' }}>Choose your player type for instant recommendation</p>
                <div className="grid grid-cols-1 gap-3">
                  {ballSelectionData.quickPicker.map((picker, index) => (
                    <button
                      key={index}
                      onClick={() => setBallRecommendation(ballSelectionData.recommendations[picker.recommendation])}
                      className="yardage-card hover:shadow-lg rounded-lg p-4 text-left transition-all transform hover:-translate-y-1"
                    >
                      <div className="font-serif font-bold" style={{ color: 'var(--leather-brown-dark)' }}>{picker.playerType}</div>
                      <div className="text-sm font-serif" style={{ color: 'var(--leather-brown-medium)' }}>{picker.description}</div>
                      <div className="text-xs font-handwritten mt-1" style={{ color: 'var(--golf-green-dark)' }}>→ {picker.ballSuggestion}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Smart Wizard */}
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Smart Wizard</h3>
                <p className="text-slate-600 mb-4">Answer 5 questions for personalized recommendation</p>
                
                {!ballRecommendation ? (
                  <div className="space-y-4">
                    {ballWizardStep < ballSelectionData.wizard.questions.length ? (
                      <>
                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((ballWizardStep + 1) / ballSelectionData.wizard.questions.length) * 100}%` }}
                          ></div>
                        </div>
                        
                        {/* Question */}
                        <div className="text-center">
                          <span className="text-sm text-slate-500">Question {ballWizardStep + 1} of {ballSelectionData.wizard.questions.length}</span>
                          <h4 className="text-lg font-bold text-slate-900 mt-2">
                            {ballSelectionData.wizard.questions[ballWizardStep].question}
                          </h4>
                        </div>
                        
                        {/* Options */}
                        <div className="space-y-3">
                          {ballSelectionData.wizard.questions[ballWizardStep].options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleWizardAnswer(ballSelectionData.wizard.questions[ballWizardStep].id, option)}
                              className="w-full authentic-card hover:bg-grass-stain border-2 border-leather-brown hover:border-golf-green p-4 text-left transition-all"
                            >
                              <div className="font-headers text-golf-green">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </>
                    ) : null}
                    
                    {ballWizardStep > 0 && (
                      <button
                        onClick={() => setBallWizardStep(Math.max(0, ballWizardStep - 1))}
                        className="font-headers text-golf-green hover:text-leather-brown"
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                ) : null}

                {ballRecommendation && (
                  <div className="page-section">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{renderIcon(ballRecommendation.icon)}</div>
                      <div>
                        <h4 className="text-2xl font-headers text-golf-green">{ballRecommendation.name}</h4>
                        <p className="font-body text-pencil-gray">{ballRecommendation.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="instruction-section">
                        <div className="section-header">Characteristics</div>
                        <div className="bullet-points">
                          {ballRecommendation.characteristics.map((char, index) => (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <span className="text-golf-green">•</span>
                              <span className="font-body text-pencil-gray">{char}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="instruction-section">
                        <div className="section-header">Best For</div>
                        <div className="bullet-points">
                          {ballRecommendation.bestFor.map((best, index) => (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <span className="text-golf-green">•</span>
                              <span className="font-body text-pencil-gray">{best}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="instruction-section">
                        <div className="section-header">Recommended Balls</div>
                        <div className="flex flex-wrap gap-2">
                          {ballRecommendation.examples.map((example, index) => (
                            <span key={index} className="bg-coffee-stain text-pencil-gray px-3 py-1 rounded-md text-sm font-data border border-leather-brown">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={resetBallWizard}
                      className="mt-6 w-full golf-button-primary py-3 font-headers"
                    >
                      Take Quiz Again
                    </button>
                  </div>
                )}
              </div>

              {/* Mixed Ball Management */}
              <div className="page-section">
                <h3 className="text-xl font-headers text-golf-green mb-4">Mixed Ball Management</h3>
                <p className="font-body text-pencil-gray mb-4">Got random balls? Here's how to manage them</p>
                
                <div className="space-y-4">
                  <div className="instruction-section">
                    <div className="section-header">Ball Identification</div>
                    <div className="bullet-points">
                      {ballSelectionData.mixedBallSystem.identification[0].tests.map((test, index) => (
                        <div key={index} className="flex items-start gap-2 mb-2">
                          <span className="text-golf-green">•</span>
                          <span className="font-body text-pencil-gray text-sm">{test}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="handwritten-tip">
                    <div className="section-header">Management Strategy</div>
                    <p className="font-handwritten text-golf-green text-sm mb-3">{ballSelectionData.mixedBallSystem.management.strategy}</p>
                    <div className="space-y-2 text-sm">
                      {ballSelectionData.mixedBallSystem.management.tips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2 mb-2">
                          <span className="text-golf-green">•</span>
                          <span className="font-handwritten text-golf-green">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page Curl Test Tab - now handled in full-screen section */}

        {/* My Data Tab */}
        {activeTab === "mydata" && (
          <div className="space-y-6">
            <div className="course-header text-center">
              <FaUser className="text-4xl mb-2 mx-auto golf-icon-bounce" />
              <h2 className="text-2xl font-headers">My Golf Data</h2>
              <p className="font-handwritten text-sm opacity-90 mt-1">"Know your game, play your game"</p>
            </div>

            {/* Yardage Chart by Skill Level - From Reference Image */}
            <div className="page-section mb-6">
              <h3 className="text-lg font-headers text-golf-green mb-4">Yardage Chart by Skill Level</h3>
              <p className="text-sm font-body text-pencil-gray mb-4">Reference distances for different skill levels</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs" style={{backgroundColor: 'var(--aged-white)', border: '1px solid var(--leather-brown)'}}>
                  <thead style={{backgroundColor: 'var(--coffee-stain)'}}>
                    <tr className="border-b" style={{borderColor: 'var(--leather-brown)'}}>
                      <th className="text-left p-2 font-headers text-golf-green">Club</th>
                      <th className="text-center p-2 font-headers text-golf-green">Beginner<br/>(Male)</th>
                      <th className="text-center p-2 font-headers text-golf-green">Average<br/>(Male)</th>
                      <th className="text-center p-2 font-headers text-golf-green">Good<br/>(Women)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(yardageBySkillLevel.beginner).map(club => (
                      <tr key={club} className="border-b" style={{borderColor: 'var(--coffee-stain)'}}>
                        <td className="p-2 font-body text-pencil-gray capitalize">{club.replace(/(\d+)/, ' $1')}</td>
                        <td className="p-2 text-center font-data text-pencil-gray">{yardageBySkillLevel.beginner[club]}</td>
                        <td className="p-2 text-center font-data text-pencil-gray">{yardageBySkillLevel.average[club]}</td>
                        <td className="p-2 text-center font-data text-pencil-gray">{yardageBySkillLevel.good[club]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="handwritten-tip mt-4">
                <span className="font-handwritten text-golf-green text-xs">
                  <strong>Note:</strong> Distances shown "in the air" for various club shots<br/>
                  Swing as if right foot is nailed to the ground until follow through. Good follow through. Imagine ball lies here.
                </span>
              </div>
            </div>

            {/* Club Distances Section */}
            <div className="page-section">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-headers text-golf-green">My Personal Club Distances</h3>
                {!editingDistances ? (
                  <button
                    onClick={startEditingDistances}
                    className="golf-button-secondary px-3 py-1 text-sm"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={saveDistances}
                      className="golf-button-primary px-3 py-1 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditingDistances}
                      className="golf-button-secondary px-3 py-1 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(editingDistances ? tempDistances : personalSettings.distances).map(([club, dist]) => (
                  <div key={club} className="flex items-center justify-between p-3 authentic-card">
                    <span className="font-headers text-golf-green capitalize">
                      {club.replace(/(\d)/, ' $1')}
                    </span>
                    {editingDistances ? (
                      <input
                        type="number"
                        value={dist}
                        onChange={(e) => updateTempDistance(club, e.target.value)}
                        className="w-16 p-1 border-2 border-leather-brown bg-aged-white rounded text-center text-sm font-data"
                        style={{color: 'var(--pencil-gray)'}}
                      />
                    ) : (
                      <span className="text-lg font-data text-pencil-gray">{dist}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Rounds Section */}
            <div className="page-section">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-headers text-golf-green">My Rounds</h3>
                <button
                  onClick={() => setShowAddRound(!showAddRound)}
                  className="golf-button-primary px-3 py-1 text-sm"
                >
                  {showAddRound ? "Cancel" : "Add Round"}
                </button>
              </div>

              {/* Add Round Form */}
              {showAddRound && (
                <div className="authentic-card p-4 mb-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Course Name"
                      value={newRound.course}
                      onChange={(e) => setNewRound(prev => ({ ...prev, course: e.target.value }))}
                      className="p-2 border-2 border-leather-brown bg-aged-white rounded font-body"
                      style={{color: 'var(--pencil-gray)'}}
                    />
                    <input
                      type="date"
                      value={newRound.date}
                      onChange={(e) => setNewRound(prev => ({ ...prev, date: e.target.value }))}
                      className="p-2 border-2 border-leather-brown bg-aged-white rounded font-data"
                      style={{color: 'var(--pencil-gray)'}}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="number"
                      placeholder="Score"
                      value={newRound.score}
                      onChange={(e) => setNewRound(prev => ({ ...prev, score: e.target.value }))}
                      className="p-2 border-2 border-leather-brown bg-aged-white rounded font-data"
                      style={{color: 'var(--pencil-gray)'}}
                    />
                    <input
                      type="number"
                      placeholder="Front 9"
                      value={newRound.front9}
                      onChange={(e) => setNewRound(prev => ({ ...prev, front9: e.target.value }))}
                      className="p-2 border-2 border-leather-brown bg-aged-white rounded font-data"
                      style={{color: 'var(--pencil-gray)'}}
                    />
                    <input
                      type="number"
                      placeholder="Back 9"
                      value={newRound.back9}
                      onChange={(e) => setNewRound(prev => ({ ...prev, back9: e.target.value }))}
                      className="p-2 border-2 border-leather-brown bg-aged-white rounded font-data"
                      style={{color: 'var(--pencil-gray)'}}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="number"
                      placeholder="Fairways"
                      value={newRound.fairways}
                      onChange={(e) => setNewRound(prev => ({ ...prev, fairways: e.target.value }))}
                      className="p-2 border-2 border-leather-brown bg-aged-white rounded font-data"
                      style={{color: 'var(--pencil-gray)'}}
                    />
                    <input
                      type="number"
                      placeholder="GIR"
                      value={newRound.gir}
                      onChange={(e) => setNewRound(prev => ({ ...prev, gir: e.target.value }))}
                      className="p-2 border-2 border-leather-brown bg-aged-white rounded font-data"
                      style={{color: 'var(--pencil-gray)'}}
                    />
                    <input
                      type="number"
                      placeholder="Total Putts"
                      value={newRound.totalPutts}
                      onChange={(e) => setNewRound(prev => ({ ...prev, totalPutts: e.target.value }))}
                      className="p-2 border-2 border-leather-brown bg-aged-white rounded font-data"
                      style={{color: 'var(--pencil-gray)'}}
                    />
                  </div>
                  
                  <textarea
                    placeholder="Notes about the round..."
                    value={newRound.mentalNotes}
                    onChange={(e) => setNewRound(prev => ({ ...prev, mentalNotes: e.target.value }))}
                    className="w-full p-2 border-2 border-leather-brown bg-aged-white rounded font-handwritten"
                    style={{color: 'var(--golf-green)'}}
                    rows="2"
                  />
                  
                  <button
                    onClick={addRound}
                    className="w-full p-2 golf-button-primary font-headers"
                    disabled={!newRound.course || !newRound.score}
                  >
                    Save Round
                  </button>
                </div>
              )}

              {/* Existing Rounds */}
              {rounds.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <p>No rounds recorded yet.</p>
                  <p className="text-sm">Add your first round above!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {rounds.map(round => (
                    <div key={round.id} className="bg-slate-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold">{round.course}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500">{round.date}</span>
                          <button
                            onClick={() => deleteRound(round.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center bg-blue-50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-blue-600">{round.score}</div>
                          <div className="text-sm text-slate-600">Score</div>
                        </div>
                        <div className="text-center bg-green-50 rounded-lg p-3">
                          <div className="text-xl font-bold text-green-600">{round.fairways}/{round.fairwaysTotal}</div>
                          <div className="text-sm text-slate-600">Fairways</div>
                        </div>
                        <div className="text-center bg-purple-50 rounded-lg p-3">
                          <div className="text-xl font-bold text-purple-600">{round.totalPutts}</div>
                          <div className="text-sm text-slate-600">Putts</div>
                        </div>
                      </div>
                      
                      {round.mentalNotes && (
                        <div className="bg-yellow-50 rounded-lg p-3">
                          <p className="text-sm text-yellow-800">{round.mentalNotes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Learn Tab - now using page-curl experience */}
        </div>
      </div>

      {/* Bottom Navigation - Golf-Themed */}
      <div className="fixed bottom-0 left-0 right-0 z-30" style={{ 
        background: 'linear-gradient(180deg, var(--weathered-cream) 0%, var(--weathered-beige) 100%)',
        borderTop: '2px solid var(--leather-brown-light)',
        boxShadow: 'var(--shadow-floating)',
        padding: '0.5rem'
      }}>
        <div className="grid grid-cols-6 gap-1 px-2 py-2">
          {tabs.map((tab, index) => {
            const IconComponent = tab.icon;
            const isPageCurlTab = index < 3; // First 3 tabs are page curl experiences
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center justify-center p-2 text-center transition-all duration-200 rounded-xl ${
                  activeTab === tab.id
                    ? "golf-button-primary scale-105"
                    : "hover:bg-white hover:shadow-md transform hover:scale-102"
                } ${isPageCurlTab ? 'page-curl-tab' : ''}`}
                style={{
                  color: activeTab === tab.id ? 'var(--weathered-white)' : 'var(--leather-brown-dark)',
                  minHeight: '60px',
                  ...(isPageCurlTab && activeTab !== tab.id ? {
                    background: 'linear-gradient(135deg, var(--aged-white) 0%, var(--weathered-cream) 100%)',
                    border: '1px solid var(--leather-brown-light)'
                  } : {})
                }}
              >
                <IconComponent className={`h-5 w-5 mb-1 ${activeTab === tab.id ? 'golf-icon-bounce' : ''}`} />
                <div className={`text-xs font-serif font-semibold tracking-tight leading-tight ${
                  activeTab === tab.id ? "text-white" : ""
                }`}>
                  {tab.name}
                </div>
                {/* Page curl indicator for yardage book tabs */}
                {isPageCurlTab && activeTab !== tab.id && (
                  <div className="absolute -top-1 -right-1 text-xs" style={{ 
                    color: 'var(--golf-green)', 
                    fontSize: '8px',
                    transform: 'rotate(15deg)'
                  }}>📖</div>
                )}
                {activeTab === tab.id && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ 
                    background: 'var(--golf-green-accent)' 
                  }}></div>
                )}
              </button>
            );
          })}
        </div>
        

      </div>

      {/* Shot Detail Modal - Disabled: Using Page Curl Interface */}
      {false && selectedShot && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[95vh] overflow-hidden shadow-2xl shadow-slate-900/25">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-5 border-b border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setSelectedShot(null)} 
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
                >
                  ← Back
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500 font-medium">{selectedShot.timeToRead}</span>
                  <span className="learn-difficulty-badge">
                    {selectedShot.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="learn-title-section">
                <div className="learn-icon-container">
                  {renderIcon(selectedShot.icon, "learn-icon")}
                </div>
                <div className="learn-title-content">
                  <h1 className="learn-page-title">{selectedShot.name}</h1>
                  <p className="learn-page-subtitle">"{selectedShot.quickTip}"</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
              <div className="learn-section key-points-section">
                <div className="learn-section-header">
                  <span className="learn-section-icon">🎯</span>
                  <h3 className="learn-section-title">When to Use</h3>
                </div>
                <p className="learn-text">{selectedShot.whenToUse || selectedShot.situation}</p>
              </div>

              <div className="learn-section drills-section">
                <div className="learn-section-header">
                  <span className="learn-section-icon">⚙️</span>
                  <h3 className="learn-section-title">Setup & Execution</h3>
                </div>
                <div className="learn-list">
                  <div className="learn-item">
                    <span className="learn-bullet green">•</span>
                    <span className="learn-text"><strong>Key Action:</strong> {selectedShot.keyAction}</span>
                  </div>
                  <div className="learn-item">
                    <span className="learn-bullet green">•</span>
                    <span className="learn-text"><strong>Club:</strong> {selectedShot.clubAdjustment}</span>
                  </div>
                  <div className="learn-item">
                    <span className="learn-bullet green">•</span>
                    <span className="learn-text"><strong>Ball Position:</strong> {selectedShot.ballPosition}</span>
                  </div>
                  <div className="learn-item">
                    <span className="learn-bullet green">•</span>
                    <span className="learn-text"><strong>Stance:</strong> {selectedShot.stance}</span>
                  </div>
                </div>
              </div>

              <div className="learn-section mistakes-section">
                <div className="learn-section-header">
                  <span className="learn-section-icon">🧠</span>
                  <h3 className="learn-section-title">Swing Thoughts</h3>
                </div>
                <div className="learn-list">
                  {selectedShot.swingThoughts.map((thought, index) => (
                    <div key={index} className="learn-item">
                      <span className="learn-number">{index + 1}</span>
                      <span className="learn-text">{thought}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="learn-insight-card pro-tip-card">
                <div className="insight-header">
                  <span className="insight-emoji">💡</span>
                  <h4 className="insight-title">Pro Tip</h4>
                </div>
                <p className="insight-text">{selectedShot.proTip}</p>
              </div>

              <div className="learn-insight-card mental-cue-card">
                <div className="insight-header">
                  <span className="insight-emoji">💭</span>
                  <h4 className="insight-title">Remember This</h4>
                </div>
                <p className="insight-quote memorable">"{selectedShot.memorableQuote}"</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GolfShotGuide; 