// app.js

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initDynamicRoutes();
  initVerticalLifts();
  
  // Dashboard Refresh simulation
  const refreshBtn = document.querySelector('.action-btn');
  refreshBtn.addEventListener('click', () => {
    refreshBtn.querySelector('i').style.transform = 'rotate(180deg)';
    setTimeout(() => {
        refreshBtn.querySelector('i').style.transform = 'rotate(0deg)';
        initVerticalLifts(); // Randomize
    }, 500);
  });
});

// 1. Gravity Map Initialization
function initMap() {
    const mapContainer = document.getElementById('gravMap');
    
    // We create an SVG view of the stadium nodes
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 800 600");
    
    // Define Stadium Nodes (Coordinates)
    const nodes = [
        { id: 'N1', x: 100, y: 150, name: 'North Entrance' },
        { id: 'N2', x: 300, y: 100, name: 'Concourse A' },
        { id: 'N3', x: 500, y: 100, name: 'Concourse B' },
        { id: 'N4', x: 700, y: 150, name: 'East Gate' },
        { id: 'C1', x: 250, y: 300, name: 'Lower Bowl Grid 1' },
        { id: 'C2', x: 550, y: 300, name: 'Lower Bowl Grid 2' },
        { id: 'S1', x: 400, y: 500, name: 'VIP Sky-Lounge' },
        { id: 'S2', x: 200, y: 450, name: 'SouthWest Ring' },
        { id: 'S3', x: 600, y: 450, name: 'SouthEast Ring' }
    ];

    // Define Pathways (Edges)
    const paths = [
        { from: 'N1', to: 'N2', active: true },
        { from: 'N2', to: 'N3', active: false },
        { from: 'N3', to: 'N4', active: true },
        { from: 'N1', to: 'C1', congested: true },
        { from: 'N2', to: 'C1', active: true },
        { from: 'N3', to: 'C2', active: true },
        { from: 'N4', to: 'C2', congested: true },
        { from: 'C1', to: 'C2', active: false },
        { from: 'C1', to: 'S2', active: true },
        { from: 'C2', to: 'S3', active: true },
        { from: 'S2', to: 'S1', active: true },
        { from: 'S3', to: 'S1', active: true },
        { from: 'C1', to: 'S1', active: false },
    ];

    // Draw Paths
    paths.forEach(path => {
        const fromNode = nodes.find(n => n.id === path.from);
        const toNode = nodes.find(n => n.id === path.to);
        
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", fromNode.x);
        line.setAttribute("y1", fromNode.y);
        line.setAttribute("x2", toNode.x);
        line.setAttribute("y2", toNode.y);
        line.classList.add("stream-path");
        
        if (path.congested) {
             line.classList.add("congested");
        } else if (path.active) {
             line.classList.add("active");
        }
        
        svg.appendChild(line);
    });

    // Draw Nodes
    nodes.forEach(node => {
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", node.x);
        circle.setAttribute("cy", node.y);
        circle.setAttribute("r", 8);
        circle.classList.add("node");
        
        // Add a tooltip effect purely by title for now
        const title = document.createElementNS(svgNS, "title");
        title.textContent = node.name;
        circle.appendChild(title);

        svg.appendChild(circle);
    });

    // Simulate Attendees moving
    for(let i=0; i<10; i++) {
        createParticle(svg, nodes, paths, svgNS);
    }

    mapContainer.appendChild(svg);
}

function createParticle(svg, nodes, paths, svgNS) {
    const activePaths = paths.filter(p => p.active || p.congested);
    const randomPath = activePaths[Math.floor(Math.random() * activePaths.length)];
    const fromNode = nodes.find(n => n.id === randomPath.from);
    const toNode = nodes.find(n => n.id === randomPath.to);

    const particle = document.createElementNS(svgNS, "circle");
    particle.setAttribute("r", 3);
    particle.classList.add("user-particle");
    svg.appendChild(particle);

    animateParticle(particle, fromNode, toNode, svg, nodes, paths, svgNS);
}

function animateParticle(particle, fromNode, toNode, svg, nodes, paths, svgNS) {
    const duration = 2000 + Math.random() * 3000;
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        
        const currentX = fromNode.x + (toNode.x - fromNode.x) * progress;
        const currentY = fromNode.y + (toNode.y - fromNode.y) * progress;
        
        particle.setAttribute("cx", currentX);
        particle.setAttribute("cy", currentY);

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Pick next path from toNode
            const nextPaths = paths.filter(p => (p.from === toNode.id || p.to === toNode.id) && (p.active || p.congested));
            if (nextPaths.length > 0) {
                 const nextPath = nextPaths[Math.floor(Math.random() * nextPaths.length)];
                 const nextTarget = nextPath.from === toNode.id ? nodes.find(n=>n.id === nextPath.to) : nodes.find(n=>n.id === nextPath.from);
                 animateParticle(particle, toNode, nextTarget, svg, nodes, paths, svgNS);
            } else {
                 particle.remove();
                 createParticle(svg, nodes, paths, svgNS);
            }
        }
    }
    window.requestAnimationFrame(step);
}

// 2. Dynamic Routing List
function initDynamicRoutes() {
    const routeList = document.getElementById('routeList');
    const routes = [
        { id: '109A', user: 'Group Alpha', from: 'North Gate', to: 'Suite 40', status: 'Optimal', time: '2m 14s' },
        { id: '402B', user: 'Pass Holder', from: 'East Gate', to: 'Lower Bowl', status: 'Rerouting', time: '1m 45s' },
        { id: '990C', user: 'Staff Team', from: 'Concourse A', to: 'Sky-Lounge', status: 'Priority', time: '0m 30s' },
        { id: '112X', user: 'Group Beta', from: 'South Gate', to: 'Ring 2', status: 'Optimal', time: '3m 05s' }
    ];

    routeList.innerHTML = '';
    routes.forEach(r => {
        const li = document.createElement('li');
        li.className = 'route-item';
        li.innerHTML = `
            <div class="route-header">
                <strong>Route ${r.id}</strong>
                <span class="route-status" style="color: ${r.status === 'Rerouting' ? 'var(--accent-purple)' : 'var(--accent-blue)'}">${r.status}</span>
            </div>
            <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                <i data-lucide="user" style="width: 14px; display: inline-block;"></i> ${r.user}
            </div>
            <div style="font-size: 0.85rem; display: flex; justify-content: space-between;">
                <span>${r.from} &rarr; ${r.to}</span>
                <span>${r.time}</span>
            </div>
        `;
        routeList.appendChild(li);
    });
}

// 3. Vertical Lifts Status
function initVerticalLifts() {
    const liftMonitor = document.getElementById('liftMonitor');
    const lifts = [
        { name: 'Grav 1', capacity: Math.floor(Math.random() * 40) + 60, color: 'var(--accent-blue)' },
        { name: 'Grav 2', capacity: Math.floor(Math.random() * 40) + 20, color: 'var(--accent-green)' },
        { name: 'VIP Lift', capacity: Math.floor(Math.random() * 20) + 10, color: 'var(--text-primary)' },
        { name: 'Freight', capacity: Math.floor(Math.random() * 60) + 40, color: 'var(--accent-purple)' }
    ];

    liftMonitor.innerHTML = '';
    lifts.forEach(lift => {
        const row = document.createElement('div');
        row.className = 'lift-row';
        row.innerHTML = `
            <div class="lift-name">${lift.name}</div>
            <div class="lift-bar-bg">
                <div class="lift-bar-fill" style="width: ${lift.capacity}%; background-color: ${lift.color};"></div>
            </div>
            <div style="width: 40px; text-align: right; font-size: 0.8rem; color: var(--text-secondary)">${lift.capacity}%</div>
        `;
        liftMonitor.appendChild(row);
    });
}
