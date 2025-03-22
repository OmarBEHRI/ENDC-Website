// Canvas setup and animation parameters
const spacing = 60; // Increased spacing to reduce the number of points
const connectionRadius = 70;
const maxConnections = 2;
const maxChainLength = 2;

// Colors configuration
const colors = {
    background: '#ebebeb',
    connections: 'rgba(32, 32, 32, 0.8)',
    pointStroke: 'rgba(0, 0, 0, 0)',
    pointFill: 'rgba(0, 0, 0, 0.2)',
    activeColors: [
        '#2a3666',
        '#3592db',
        '#4176ab',
        '#dc4c43',
        '#e86b2d'
    ]
};

// Connection class to handle growing connections
class Connection {
    constructor(fromPoint, toPoint) {
        this.fromPoint = fromPoint;
        this.toPoint = toPoint;
        this.progress = 0;
        this.speed = 0.003;
        this.active = true;
        this.opacity = 1.0;
        this.fadeSpeed = 0.001;
    }
    
    update(dt) {
        if (this.active && this.progress < 1) {
            this.progress += this.speed * dt;
            
            if (this.progress >= 1) {
                this.progress = 1;
                this.toPoint.activate(performance.now(), this.fromPoint.chainDepth + 1);
            }
        } else if (!this.active && this.opacity > 0) {
            this.opacity -= this.fadeSpeed * dt;
            if (this.opacity < 0) this.opacity = 0;
        }
    }
    
    draw(ctx) {
        if (this.progress > 0 && this.opacity > 0) {
            const startX = this.fromPoint.x;
            const startY = this.fromPoint.y;
            const endX = this.toPoint.x;
            const endY = this.toPoint.y;
            
            const currentX = startX + (endX - startX) * this.progress;
            const currentY = startY + (endY - startY) * this.progress;
            
            ctx.strokeStyle = `rgba(32, 32, 32, ${0.8 * this.opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
        }
    }
}

// Point class
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 1.5 + Math.random() * 0.5;
        this.targetRadius = this.radius;
        this.active = false;
        this.connections = [];
        this.activationTime = 0;
        this.shape = 'circle';
        this.targetShape = this.shape;
        this.animationProgress = 0;
        this.activeDuration = 800 + Math.random() * 1200;
        this.chainDepth = 0;
        this.activeColor = colors.activeColors[Math.floor(Math.random() * colors.activeColors.length)];
    }
    
    activate(currentTime, chainDepth = 0) {
        if (!this.active) {
            this.active = true;
            this.activationTime = currentTime;
            this.targetRadius = 5 + Math.random() * 2;
            this.chainDepth = chainDepth;
            
            const shapes = ['circle', 'square', 'triangle'];
            this.targetShape = shapes[Math.floor(Math.random() * shapes.length)];
            
            if (this.connections.length < maxConnections && chainDepth < maxChainLength) {
                this.findNearbyPoints();
            }
            
            setTimeout(() => {
                this.deactivate();
            }, this.activeDuration);
        }
    }
    
    deactivate() {
        this.active = false;
        this.targetRadius = 1.5 + Math.random() * 0.5;
        
        this.connections.forEach(conn => {
            conn.active = false;
        });
        
        // Use a more efficient approach to clean up connections
        if (this.connections.length > 0) {
            setTimeout(() => {
                this.connections = this.connections.filter(conn => conn.opacity > 0);
            }, 2000);
        }
    }
    
    findNearbyPoints() {
        // Only search for nearby points if we don't have enough connections
        if (this.connections.length >= maxConnections) return;
        
        // Use a more efficient approach to find nearby points
        const nearbyPoints = [];
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            if (p === this || this.isConnectedTo(p) || p.connections.length >= maxConnections || p.active) continue;
            
            const dx = p.x - this.x;
            const dy = p.y - this.y;
            const distSquared = dx * dx + dy * dy;
            if (distSquared < connectionRadius * connectionRadius) {
                nearbyPoints.push(p);
                if (nearbyPoints.length >= maxConnections) break;
            }
        }
        
        if (nearbyPoints.length > 0) {
            const numConnections = Math.min(Math.ceil(Math.random() * 2), nearbyPoints.length, maxConnections - this.connections.length);
            for (let i = 0; i < numConnections; i++) {
                const randomIndex = Math.floor(Math.random() * nearbyPoints.length);
                const targetPoint = nearbyPoints.splice(randomIndex, 1)[0];
                
                const newConnection = new Connection(this, targetPoint);
                this.connections.push(newConnection);
            }
        }
    }
    
    isConnectedTo(point) {
        for (let i = 0; i < this.connections.length; i++) {
            if (this.connections[i].toPoint === point) return true;
        }
        return false;
    }
    
    update(dt, ctx) {
        this.radius += (this.targetRadius - this.radius) * Math.min(dt * 0.01, 0.2);
        
        if (this.active) {
            this.animationProgress = Math.min(1, (performance.now() - this.activationTime) / 500);
        } else {
            this.animationProgress = Math.max(0, this.animationProgress - dt * 0.002);
        }
        
        for (let i = 0; i < this.connections.length; i++) {
            this.connections[i].update(dt);
        }
        
        // Only filter connections if needed
        if (this.connections.some(conn => conn.opacity <= 0)) {
            this.connections = this.connections.filter(conn => conn.opacity > 0);
        }
    }
    
    draw(ctx) {
        ctx.strokeStyle = colors.pointStroke;
        ctx.fillStyle = this.active ? this.activeColor : colors.pointFill;
        
        const currentShape = this.shape !== this.targetShape ? 
            this.animationProgress > 0.5 ? this.targetShape : this.shape :
            this.shape;
        
        ctx.beginPath();
        
        switch (currentShape) {
            case 'circle':
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                break;
            case 'square':
                ctx.rect(
                    this.x - this.radius, 
                    this.y - this.radius, 
                    this.radius * 2, 
                    this.radius * 2
                );
                break;
            case 'triangle':
                ctx.moveTo(this.x, this.y - this.radius);
                ctx.lineTo(this.x + this.radius * Math.cos(Math.PI / 6), this.y + this.radius * Math.sin(Math.PI / 6));
                ctx.lineTo(this.x - this.radius * Math.cos(Math.PI / 6), this.y + this.radius * Math.sin(Math.PI / 6));
                ctx.closePath();
                break;
        }
        
        ctx.fill();
        ctx.stroke();
    }
}

// Animation state
let points = [];
let mouseX = -100;
let mouseY = -100;
let mouseInCanvas = false;
let lastTime = 0;
let animationRunning = true;
let ctx = null;
let animationFrameId = null;
let isVisible = true;

// Initialize grid of points
function initializePoints(canvas) {
    points = [];
    
    const cols = Math.floor(canvas.width / spacing);
    const rows = Math.floor(canvas.height / spacing);
    
    // Limit the number of points to improve performance
    const maxPoints = 200;
    const totalPoints = cols * rows;
    
    if (totalPoints <= maxPoints) {
        // Create all points if under the limit
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * spacing + spacing/2;
                const y = j * spacing + spacing/2;
                points.push(new Point(x, y));
            }
        }
    } else {
        // Create a subset of points if over the limit
        const skipFactor = Math.ceil(totalPoints / maxPoints);
        let count = 0;
        
        for (let i = 0; i < cols; i += skipFactor) {
            for (let j = 0; j < rows; j += skipFactor) {
                const x = i * spacing + spacing/2;
                const y = j * spacing + spacing/2;
                points.push(new Point(x, y));
                count++;
                if (count >= maxPoints) break;
            }
            if (count >= maxPoints) break;
        }
    }
    
    triggerWave(canvas);
}

// Create random connections (optimized)
function createRandomConnections() {
    if (!mouseInCanvas || Math.random() >= 0.01) return;
    
    const inactivePoints = points.filter(p => !p.active);
    if (inactivePoints.length < 2) return;
    
    const randomIndex1 = Math.floor(Math.random() * inactivePoints.length);
    const point1 = inactivePoints[randomIndex1];
    point1.activate(performance.now());
}

// Trigger wave animation
function triggerWave(canvas, x, y) {
    if (!canvas) return;
    const centerX = x !== undefined ? x : Math.random() * canvas.width;
    const centerY = y !== undefined ? y : Math.random() * canvas.height;
    
    // Only sort a subset of points to improve performance
    const maxPointsToActivate = Math.min(5, points.length);
    const nearestPoints = [];
    
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        const distSquared = Math.pow(point.x - centerX, 2) + Math.pow(point.y - centerY, 2);
        
        if (nearestPoints.length < maxPointsToActivate) {
            nearestPoints.push({ point, distSquared });
            nearestPoints.sort((a, b) => a.distSquared - b.distSquared);
        } else if (distSquared < nearestPoints[maxPointsToActivate - 1].distSquared) {
            nearestPoints.pop();
            nearestPoints.push({ point, distSquared });
            nearestPoints.sort((a, b) => a.distSquared - b.distSquared);
        }
    }
    
    for (let i = 0; i < nearestPoints.length; i++) {
        const delay = i * 50;
        setTimeout(() => {
            nearestPoints[i].point.activate(performance.now());
        }, delay);
    }
}

// Check if element is visible in viewport
function isElementVisible() {
    return document.visibilityState === 'visible';
}

// Animation loop (optimized)
function animate(ctx, canvas, currentTime) {
    if (!animationRunning) {
        return;
    }
    
    // Skip animation frame if not visible
    if (!isVisible) {
        animationFrameId = requestAnimationFrame((time) => animate(ctx, canvas, time));
        return;
    }
    
    const dt = lastTime ? Math.min(currentTime - lastTime, 100) : 16; // Cap dt to avoid large jumps
    lastTime = currentTime;
    
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update all points
    for (let i = 0; i < points.length; i++) {
        points[i].update(dt, ctx);
    }
    
    // Draw connections
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        for (let j = 0; j < point.connections.length; j++) {
            point.connections[j].draw(ctx);
        }
    }
    
    // Draw points
    for (let i = 0; i < points.length; i++) {
        points[i].draw(ctx);
    }
    
    // Apply blur effect (expensive operation - only do occasionally)
    if (currentTime % 3 === 0) {
        ctx.filter = 'blur(4px)';
        ctx.fillStyle = 'rgba(235, 235, 235, 0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.filter = 'none';
    }
    
    // Handle mouse interactions
    if (mouseInCanvas) {
        // Activate points near mouse with reduced frequency
        if (Math.random() < 0.01) {
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                if (!point.active) {
                    const dx = point.x - mouseX;
                    const dy = point.y - mouseY;
                    const distSquared = dx * dx + dy * dy;
                    
                    if (distSquared < 2500 && Math.random() < 0.1) { // 50^2 = 2500
                        point.activate(currentTime);
                    }
                }
            }
        }
    }
    
    // Create random connections occasionally
    createRandomConnections();
    
    // Request next frame
    animationFrameId = requestAnimationFrame((time) => animate(ctx, canvas, time));
}

// Setup mouse event listeners
function createMouseListeners(canvas) {
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseenter', () => {
        mouseInCanvas = true;
    });

    canvas.addEventListener('mouseleave', () => {
        mouseInCanvas = false;
        mouseX = -100;
        mouseY = -100;
    });

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        triggerWave(canvas, x, y);
    });
}

// Setup visibility detection
function setupVisibilityDetection(canvas) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        },
        { threshold: 0.1 }
    );
    
    observer.observe(canvas);
    
    return () => observer.disconnect();
}

// Initialize animation
function initAnimation(canvas) {
    ctx = canvas.getContext('2d');
    resizeCanvas(canvas);
    initializePoints(canvas);
    createMouseListeners(canvas);
    const cleanup = setupVisibilityDetection(canvas);
    
    animationRunning = true;
    lastTime = 0;
    animate(ctx, canvas, performance.now());
    
    return cleanup;
}

// Handle canvas cleanup
function cleanupAnimation() {
    animationRunning = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    points = [];
    ctx = null;
}

// Handle canvas resizing
function resizeCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    ctx.scale(dpr, dpr);
}

// Export functions
export {
    initAnimation,
    cleanupAnimation,
    Point,
    Connection
};
