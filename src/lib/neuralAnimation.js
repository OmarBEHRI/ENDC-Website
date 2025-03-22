// Canvas setup and animation parameters
const spacing = 40;
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
    
    update(dt, ctx) {
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
        
        setTimeout(() => {
            this.connections = this.connections.filter(conn => conn.opacity > 0);
        }, 2000);
    }
    
    findNearbyPoints() {
        const nearbyPoints = points.filter(p => {
            if (p === this) return false;
            if (this.isConnectedTo(p)) return false;
            if (p.connections.length >= maxConnections) return false;
            if (p.active) return false;
            
            const dx = p.x - this.x;
            const dy = p.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < connectionRadius;
        });
        
        if (nearbyPoints.length > 0) {
            const numConnections = Math.min(Math.ceil(Math.random() * 2), nearbyPoints.length);
            for (let i = 0; i < numConnections; i++) {
                if (this.connections.length >= maxConnections) break;
                
                const randomIndex = Math.floor(Math.random() * nearbyPoints.length);
                const targetPoint = nearbyPoints.splice(randomIndex, 1)[0];
                
                const newConnection = new Connection(this, targetPoint);
                this.connections.push(newConnection);
            }
        }
    }
    
    isConnectedTo(point) {
        return this.connections.some(conn => conn.toPoint === point);
    }
    
    update(dt) {
        this.radius += (this.targetRadius - this.radius) * Math.min(dt * 0.01, 0.2);
        
        if (this.active) {
            this.animationProgress = Math.min(1, (performance.now() - this.activationTime) / 500);
        } else {
            this.animationProgress = Math.max(0, this.animationProgress - dt * 0.002);
        }
        
        this.connections.forEach(connection => {
            connection.update(dt, ctx);
        });
        
        this.connections = this.connections.filter(conn => conn.opacity > 0);
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

// Initialize grid of points
function initializePoints(canvas) {
    points = [];
    
    const cols = Math.floor(canvas.width / spacing);
    const rows = Math.floor(canvas.height / spacing);
    
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * spacing + spacing/2;
            const y = j * spacing + spacing/2;
            points.push(new Point(x, y));
        }
    }
    
    triggerWave();
}

// Create random connections
function createRandomConnections() {
    if (!mouseInCanvas) return;
    
    const inactivePoints = points.filter(p => !p.active);
    if (inactivePoints.length < 2) return;
    
    const randomIndex1 = Math.floor(Math.random() * inactivePoints.length);
    const point1 = inactivePoints[randomIndex1];
    
    const possibleTargets = inactivePoints.filter(p => {
        if (p === point1) return false;
        
        const dx = p.x - point1.x;
        const dy = p.y - point1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance > 50 && distance < 150;
    });
    
    if (possibleTargets.length > 0) {
        const randomIndex2 = Math.floor(Math.random() * possibleTargets.length);
        const point2 = possibleTargets[randomIndex2];
        
        point1.activate(performance.now());
    }
}

// Trigger wave animation
function triggerWave(canvas, x, y) {
    if (!canvas) return;
    const centerX = x !== undefined ? x : Math.random() * canvas.width;
    const centerY = y !== undefined ? y : Math.random() * canvas.height;
    
    const sortedPoints = [...points].sort((a, b) => {
        const distA = Math.sqrt(Math.pow(a.x - centerX, 2) + Math.pow(a.y - centerY, 2));
        const distB = Math.sqrt(Math.pow(b.x - centerX, 2) + Math.pow(b.y - centerY, 2));
        return distA - distB;
    });
    
    for (let i = 0; i < 5 && i < sortedPoints.length; i++) {
        setTimeout(() => {
            sortedPoints[i].activate(performance.now());
        }, i * 50);
    }
}

// Animation loop
function animate(ctx, canvas, currentTime) {
    if (!animationRunning) {
        lastTime = currentTime;
        requestAnimationFrame((time) => animate(ctx, canvas, time));
        return;
    }
    
    const dt = lastTime ? currentTime - lastTime : 16;
    lastTime = currentTime;
    
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    points.forEach(point => {
        point.update(dt);
    });
    
    points.forEach(point => {
        point.connections.forEach(connection => connection.draw(ctx));
    });
    
    points.forEach(point => {
        point.draw(ctx);
    });
    
    ctx.filter = 'blur(4px)';
    ctx.fillStyle = 'rgba(235, 235, 235, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.filter = 'none';
    
    if (mouseInCanvas) {
        points.forEach(point => {
            if (!point.active) {
                const dx = point.x - mouseX;
                const dy = point.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 50 && Math.random() < 0.03) {
                    point.activate(currentTime);
                }
            }
        });
        
        if (Math.random() < 0.01) {
            createRandomConnections();
        }
    } else {
        points.forEach(point => {
            if (!point.active && Math.random() < 0.00005 * dt) {
                point.activate(currentTime);
            }
        });
    }
    
    requestAnimationFrame((time) => animate(ctx, canvas, time));
}

// Initialize animation
function initAnimation(canvas) {
    let ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    ctx = ctx || canvas.getContext('2d');
    initializePoints(canvas);
    
    const cleanup = () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('resize', handleResize);
        animationRunning = false;
    };
    
    const handleMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };
    
    const handleMouseEnter = () => {
        mouseInCanvas = true;
    };
    
    const handleMouseLeave = () => {
        mouseInCanvas = false;
        mouseX = -100;
        mouseY = -100;
    };
    
    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializePoints(canvas);
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    
    animationRunning = true;
    requestAnimationFrame((time) => animate(ctx, canvas, time));
    
    return cleanup;
}

export { initAnimation };