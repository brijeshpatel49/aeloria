// Auto-generate dress descriptions based on name and occasion

const descriptionTemplates = {
  Evening: [
    "A stunning {name} perfect for evening soirées and romantic dinners. Features elegant design that captures attention and celebrates your unique style.",
    "Elevate your evening look with this exquisite {name}. Designed for special occasions, this piece combines sophistication with modern elegance.",
    "Make a statement at your next evening event with this beautiful {name}. Crafted to perfection, it's the ideal choice for memorable nights.",
    "This gorgeous {name} is your go-to piece for elegant evening affairs. Timeless design meets contemporary style in this must-have dress.",
  ],
  Casual: [
    "Effortless style meets comfort in this beautiful {name}. Perfect for daytime events, brunches, or casual gatherings with friends.",
    "Embrace relaxed elegance with this charming {name}. Ideal for everyday wear, garden parties, or weekend outings.",
    "This versatile {name} brings casual sophistication to your wardrobe. Easy to style and comfortable for all-day wear.",
    "Discover comfort without compromising style in this lovely {name}. Perfect for casual occasions and everyday elegance.",
  ],
  Formal: [
    "Command attention in this magnificent {name}. Designed for formal events and special celebrations, this dress is pure elegance.",
    "Make an unforgettable entrance with this stunning {name}. Perfect for weddings, galas, and formal occasions that demand sophistication.",
    "This breathtaking {name} is crafted for those special moments. Elegant, refined, and designed to make you feel extraordinary.",
    "Celebrate in style with this exquisite {name}. A show-stopping piece for formal events and milestone celebrations.",
  ],
};

export function generateDescription(name, occasion = "Casual") {
  // Get templates for the occasion
  const templates = descriptionTemplates[occasion] || descriptionTemplates.Casual;
  
  // Pick a random template
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  // Replace {name} placeholder with actual dress name
  return template.replace(/{name}/g, name);
}

export function generateDescriptionFromDress(dress) {
  return generateDescription(dress.name, dress.occasion);
}
