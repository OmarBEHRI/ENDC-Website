// Particle Animation System
// Features:
// - Particles with connections when close to each other
// - Mouse repulsion
// - Particle regeneration when leaving screen
// - Performance optimization (pause when not visible)

// Configuration
const config = {
  particleCount: 100,
  particleSize: 2,
  particleColor: 'rgba(32, 32, 32, 0.3)',
  connectionColor: 'rgba(32, 32, 32, 0.2)',
  connectionDistance: 150,
  connectionWidth: 1,
  mouseRepelRadius: 100,
  mouseRepelStrength: 0.1,
  particleSpeed: 0.5,
  backgroundColor: '#ebebeb'
};

// Particle class
class Particle {
  constructor(canvas, x, y) {
    this.canvas = canvas;
    this.x = x || Math.random() * canvas.width;
    this.y = y || Math.random() * canvas.height;
    this.size = config.particleSize;
    this.speedX = (Math.random() - 0.5) * config.particleSpeed;
    this.speedY = (Math.random() - 0.5) * config.particleSpeed;
    this.connections = [];
  }

  update(mouseX, mouseY) {
    // Move particle
    this.x += this.speedX;
    this.y += this.speedY;

    // Mouse repulsion
    if (mouseX !== null && mouseY !== null) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < config.mouseRepelRadius) {
        const force = (config.mouseRepelRadius - distance) / config.mouseRepelRadius;
        this.speedX += dx / distance * force * config.mouseRepelStrength;
        this.speedY += dy / distance * force * config.mouseRepelStrength;
      }
    }

    // Check if particle is out of bounds
    if (this.x < 0 || this.x > this.canvas.width || 
        this.y < 0 || this.y > this.canvas.height) {
      this.regenerate();
    }

    // Limit speed
    const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
    if (speed > config.particleSpeed * 2) {
      this.speedX = (this.speedX / speed) * config.particleSpeed * 2;
      this.speedY = (this.speedY / speed) * config.particleSpeed * 2;
    }
  }

  regenerate() {
    // Determine which side to enter from
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    
    switch (side) {
      case 0: // top
        this.x = Math.random() * this.canvas.width;
        this.y = 0;
        this.speedY = Math.abs(this.speedY);
        break;
      case 1: // right
        this.x = this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.speedX = -Math.abs(this.speedX);
        break;
      case 2: // bottom
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height;
        this.speedY = -Math.abs(this.speedY);
        break;
      case 3: // left
        this.x = 0;
        this.y = Math.random() * this.canvas.height;
        this.speedX = Math.abs(this.speedX);
        break;
    }
  }

  draw(ctx) {
    ctx.fillStyle = config.particleColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Animation state
let particles = [];
let mouseX = null;
let mouseY = null;
let animationFrameId = null;
let isVisible = true;
let animationRunning = true;

// Initialize particles
function initParticles(canvas) {
  particles = [];
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new Particle(canvas));
  }
}

// Draw connections between particles
function drawConnections(ctx) {
  ctx.strokeStyle = config.connectionColor;
  ctx.lineWidth = config.connectionWidth;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < config.connectionDistance) {
        // Set opacity based on distance
        const opacity = 1 - (distance / config.connectionDistance);
        ctx.strokeStyle = `rgba(32, 32, 32, ${opacity * 0.2})`;
        
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

// Animation loop
function animate(ctx, canvas) {
  if (!animationRunning) {
    return;
  }

  // Skip animation frame if not visible
  if (!isVisible) {
    animationFrameId = requestAnimationFrame(() => animate(ctx, canvas));
    return;
  }

  // Clear canvas
  ctx.fillStyle = config.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update(mouseX, mouseY);
  }

  // Draw connections
  drawConnections(ctx);

  // Draw particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw(ctx);
  }

  // Request next frame
  animationFrameId = requestAnimationFrame(() => animate(ctx, canvas));
}

// Setup mouse event listeners
function createMouseListeners(canvas) {
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
  });

  // Touch support for mobile
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    mouseX = e.touches[0].clientX - rect.left;
    mouseY = e.touches[0].clientY - rect.top;
  });

  canvas.addEventListener('touchend', () => {
    mouseX = null;
    mouseY = null;
  });
}

// Setup visibility detection
function setupVisibilityDetection(canvas) {
  // Use Intersection Observer to detect when canvas is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    },
    { threshold: 0.1 }
  );
  
  observer.observe(canvas);
  
  // Also check document visibility
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      isVisible = false;
    } else if (document.visibilityState === 'visible') {
      isVisible = true;
    }
  });
  
  return () => {
    observer.disconnect();
    document.removeEventListener('visibilitychange', () => {});
  };
}

// Handle canvas resizing
function resizeCanvas(canvas, ctx) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  
  ctx.scale(dpr, dpr);
}

// Initialize animation
export const initAnimation = (canvas) => {
  const ctx = canvas.getContext('2d');
  
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  // Initial resize
  resizeCanvas();

  // Add resize listener
  window.addEventListener('resize', resizeCanvas);

  initParticles(canvas);
  createMouseListeners(canvas);
  const cleanup = setupVisibilityDetection(canvas);
  
  animationRunning = true;
  animate(ctx, canvas);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', resizeCanvas);
    animationRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    cleanup();
    // window.removeEventListener('resize', handleResize);
  };
}

// Remove this duplicate export
// export {
//   initAnimation
// };