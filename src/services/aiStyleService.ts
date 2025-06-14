
interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'color' | 'style' | 'outfit' | 'general';
}

export const getStyleAdvice = async (userMessage: string, chatHistory: Message[]): Promise<string> => {
  // This is a comprehensive AI-style response system
  // In a real app, you'd connect to OpenAI, Claude, or another AI service
  
  const lowerMessage = userMessage.toLowerCase();
  
  // Color Analysis Responses
  if (lowerMessage.includes('color') || lowerMessage.includes('palette')) {
    return getColorAdvice(lowerMessage);
  }
  
  // Style Advice Responses
  if (lowerMessage.includes('style') || lowerMessage.includes('personal')) {
    return getStylePersonalityAdvice(lowerMessage);
  }
  
  // Outfit and Combination Advice
  if (lowerMessage.includes('outfit') || lowerMessage.includes('wear') || lowerMessage.includes('combination')) {
    return getOutfitAdvice(lowerMessage);
  }
  
  // Pattern and Mixing Advice
  if (lowerMessage.includes('pattern') || lowerMessage.includes('mix')) {
    return getPatternAdvice();
  }
  
  // Trend Advice
  if (lowerMessage.includes('trend') || lowerMessage.includes('current') || lowerMessage.includes('fashion')) {
    return getTrendAdvice();
  }
  
  // Body Type Advice
  if (lowerMessage.includes('body') || lowerMessage.includes('figure') || lowerMessage.includes('shape')) {
    return getBodyTypeAdvice(lowerMessage);
  }
  
  // Occasion-specific advice
  if (lowerMessage.includes('interview') || lowerMessage.includes('work') || lowerMessage.includes('professional')) {
    return getProfessionalAdvice();
  }
  
  if (lowerMessage.includes('date') || lowerMessage.includes('dinner') || lowerMessage.includes('casual')) {
    return getCasualAdvice();
  }
  
  // Default personalized response
  return getGeneralStyleAdvice(lowerMessage);
};

const getColorAdvice = (message: string): string => {
  const colorAdvice = [
    "🎨 **Color Analysis Tips:**\n\n• **Warm undertones** (golden/yellow): Try warm colors like coral, peach, warm browns, and golden yellows\n• **Cool undertones** (pink/blue): Go for jewel tones, cool blues, emerald greens, and true reds\n• **Neutral undertones**: You're lucky! Most colors work well on you\n\n**Quick test**: Hold gold and silver jewelry near your face - whichever looks better indicates your undertone!",
    
    "✨ **Perfect Color Combinations:**\n\n• **Monochromatic**: Different shades of the same color (navy + light blue)\n• **Complementary**: Opposite colors on the color wheel (blue + orange)\n• **Analogous**: Colors next to each other (blue + green + teal)\n• **Neutral + Pop**: Beige/black/white + one bright accent color\n\n**Pro tip**: Start with neutrals and add one statement color!",
    
    "🌈 **Seasonal Color Guide:**\n\n• **Spring**: Bright, warm colors - coral, peach, bright blue\n• **Summer**: Soft, cool colors - lavender, soft pink, dusty blue\n• **Autumn**: Rich, warm colors - rust, olive, deep orange\n• **Winter**: Bold, cool colors - true red, royal blue, black\n\nWhat season do you think matches your natural coloring?"
  ];
  
  return colorAdvice[Math.floor(Math.random() * colorAdvice.length)];
};

const getStylePersonalityAdvice = (message: string): string => {
  const styleAdvice = [
    "👗 **Finding Your Personal Style:**\n\n1. **Look at your lifestyle** - What do you do most days?\n2. **Pinterest test** - Save 20 outfits you love, look for patterns\n3. **Comfort first** - Your style should feel like YOU\n4. **Start small** - Add one new element at a time\n\n**Style archetypes to consider**: Classic, Bohemian, Minimalist, Romantic, Edgy, or Preppy. Which resonates with you?",
    
    "✨ **Style Evolution Tips:**\n\n• **Classic**: Timeless pieces, neutral colors, clean lines\n• **Bohemian**: Flowy fabrics, earth tones, layered accessories\n• **Minimalist**: Simple silhouettes, limited color palette, quality basics\n• **Romantic**: Soft fabrics, florals, feminine details\n• **Edgy**: Bold pieces, leather, unexpected combinations\n\nRemember: You can blend styles! What speaks to you most?",
    
    "🎯 **Building Your Signature Style:**\n\n• **Audit your closet** - What do you reach for most?\n• **Identify your 'uniform'** - Your go-to comfortable outfit\n• **Add your twist** - One unique element that's totally you\n• **Quality over quantity** - Invest in pieces you'll wear often\n\nYour style should make you feel confident and authentic!"
  ];
  
  return styleAdvice[Math.floor(Math.random() * styleAdvice.length)];
};

const getOutfitAdvice = (message: string): string => {
  const outfitTips = [
    "👔 **Outfit Building Basics:**\n\n• **Start with one statement piece** - then build around it\n• **Follow the 60-30-10 rule**: 60% main color, 30% secondary, 10% accent\n• **Vary your proportions**: Wide top + fitted bottom (or vice versa)\n• **Layer thoughtfully**: Each layer should add something new\n\n**Quick combo**: Jeans + white tee + blazer + statement jewelry = effortlessly chic!",
    
    "✨ **Mixing Textures & Fabrics:**\n\n• **Rough + Smooth**: Denim + silk, leather + cotton\n• **Matte + Shiny**: Wool + satin, cotton + metallic\n• **Structured + Flowy**: Blazer + flowing skirt\n\n**Pro tip**: Mixing textures adds visual interest even in monochrome outfits!",
    
    "🎨 **Creating Visual Interest:**\n\n• **Play with proportions**: Oversized top + skinny bottoms\n• **Add a focal point**: Bold necklace, colorful shoes, patterned scarf\n• **Layer strategically**: Tank + cardigan + jacket\n• **Mix formality levels**: Sneakers with a dress, blazer with jeans\n\nWhat's your go-to outfit formula?"
  ];
  
  return outfitTips[Math.floor(Math.random() * outfitTips.length)];
};

const getPatternAdvice = (): string => {
  return "🔄 **Pattern Mixing Like a Pro:**\n\n• **Start with one pattern** + solid colors\n• **Different scales**: Large floral + small stripes\n• **Same color family**: Navy stripes + navy polka dots\n• **Classic combos**: Stripes + florals, plaid + solid\n\n**Golden rule**: Keep one element consistent (color, style, or theme)\n\n**Beginner tip**: Use accessories to test pattern mixing - patterned scarf with striped shirt!";
};

const getTrendAdvice = (): string => {
  return "📈 **Current Style Trends & How to Wear Them:**\n\n• **Oversized blazers**: Great for any body type, roll sleeves for casual look\n• **Wide-leg pants**: Elongating and comfortable, pair with fitted tops\n• **Statement sleeves**: Puff, balloon, or dramatic sleeves add interest\n• **Monochrome dressing**: Easy way to look put-together\n\n**Remember**: Trends are fun, but your personal style is timeless. Pick trends that align with your aesthetic!";
};

const getBodyTypeAdvice = (message: string): string => {
  return "💃 **Dressing for Your Body:**\n\n**Universal tips that work for everyone:**\n• **Fit is everything** - Tailoring makes any outfit look expensive\n• **Define your waist** - Even loose clothing can have shape\n• **Vertical lines** elongate your silhouette\n• **Confidence** is your best accessory!\n\n**Remember**: Every body is beautiful! The goal is to dress in a way that makes YOU feel amazing. What makes you feel most confident?";
};

const getProfessionalAdvice = (): string => {
  return "💼 **Professional & Interview Outfits:**\n\n• **Classic combo**: Tailored blazer + blouse + trousers/pencil skirt\n• **Modern twist**: Sheath dress + cardigan + loafers\n• **Colors**: Navy, charcoal, black, or neutral tones\n• **Accessories**: Simple jewelry, structured bag, closed-toe shoes\n\n**Interview tip**: Dress one level above the company's daily dress code. When in doubt, err on the side of being slightly overdressed!";
};

const getCasualAdvice = (): string => {
  return "😊 **Elevated Casual Looks:**\n\n• **Upgrade your basics**: Well-fitted jeans, quality tees, comfortable sneakers\n• **Easy additions**: Denim jacket, cardigan, or light scarf\n• **Comfortable shoes**: Clean sneakers, ankle boots, or flats\n• **Effortless styling**: French tuck, rolled sleeves, layered necklaces\n\n**Date night tip**: Dark jeans + nice top + blazer + comfortable heels = perfect balance of casual and dressed up!";
};

const getGeneralStyleAdvice = (message: string): string => {
  const generalTips = [
    "✨ **Style Confidence Boosters:**\n\n• **Invest in basics** that fit you perfectly\n• **Find your signature** - one thing that's uniquely you\n• **Comfort is key** - you'll always look better when you feel good\n• **Experiment safely** - try new things with accessories first\n\nWhat aspect of your style do you want to work on most?",
    
    "🎯 **Wardrobe Building Strategy:**\n\n• **Start with a color palette** (3-4 colors max)\n• **Identify your lifestyle needs** (work, casual, special events)\n• **Quality basics first**: jeans, white shirt, blazer, LBD\n• **Add personality pieces** gradually\n\nWhat's your biggest wardrobe challenge right now?",
    
    "💫 **Style Rules Worth Breaking:**\n\n• Mix metals in jewelry ✅\n• Wear white after Labor Day ✅\n• Match your bag to your shoes (not necessary!) ✅\n• Wear patterns together ✅\n\n**Real rule**: If it makes you feel confident and comfortable, wear it! Fashion should be fun, not restrictive."
  ];
  
  return generalTips[Math.floor(Math.random() * generalTips.length)];
};
