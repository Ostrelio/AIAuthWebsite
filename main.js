/**
 * Ostrelio — Runtime Authorization for AI Agents
 * Interactive Living Engine & High-Level Page Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initStatsCountUp();
  initPipelineSimulation();
  initNavLinks();
  initAccessForm();
});

/**
 * 1) Stats Counter Animation
 */
function initStatsCountUp() {
  const statElements = document.querySelectorAll('.stat-value');
  const statsGrid = document.querySelector('.stats-grid');
  if (!statElements.length || !statsGrid) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const formatNumber = (num, decimals) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    if (num >= 1000) {
      return Math.round(num).toLocaleString('en-US');
    }
    return Math.round(num).toString();
  };

  const setFinalValues = () => {
    statElements.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      el.textContent = prefix + formatNumber(target, decimals) + suffix;
    });
  };

  if (prefersReducedMotion) {
    setFinalValues();
    return;
  }

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        observer.disconnect();

        statElements.forEach((el, index) => {
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1600 + index * 90;
          const startOffset = 300 + index * 90;

          setTimeout(() => {
            let startTime = null;

            function animate(timestamp) {
              if (!startTime) startTime = timestamp;
              const elapsed = timestamp - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutCubic: 1 - (1 - t)^3
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = target * eased;
              el.textContent = prefix + formatNumber(current, decimals) + suffix;

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                el.textContent = prefix + formatNumber(target, decimals) + suffix;
              }
            }

            requestAnimationFrame(animate);
          }, startOffset);
        });
      }
    });
  }, { threshold: 0.2 });

  observer.observe(statsGrid);
}

/**
 * 2) Interactive Living Runtime Pipeline Simulation
 */
function initPipelineSimulation() {
  const canvas = document.getElementById('pipeline-canvas');
  const container = document.querySelector('.pipeline-stage');
  const irisCore = document.getElementById('iris-core');
  const irisLatency = document.getElementById('iris-latency');
  const irisOps = document.getElementById('iris-ops');
  const irisStatusText = document.getElementById('iris-status-text');
  const avgLatencyEl = document.getElementById('live-avg-latency');
  const feedList = document.getElementById('stream-feed-list');

  const btnStream = document.getElementById('btn-mode-stream');
  const btnBreach = document.getElementById('btn-mode-breach');
  const btnSwarm = document.getElementById('btn-mode-swarm');

  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let particles = [];

  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    const nextWidth = rect.width;
    const nextHeight = rect.height;
    const layoutChanged = nextWidth !== width || nextHeight !== height;
    width = nextWidth;
    height = nextHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    if (layoutChanged) particles = [];
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particles system
  let currentMode = 'stream'; // 'stream' | 'breach' | 'swarm'
  let spawnInterval = 180;
  let lastSpawn = 0;

  const AGENT_COLORS = ['#38bdf8', '#a855f7', '#10b981'];

  function centerInStage(el, stageRect) {
    const r = el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - stageRect.left,
      y: r.top + r.height / 2 - stageRect.top
    };
  }

  // Card centers, so the path follows the stacked mobile layout and the desktop row.
  const getCoordinates = () => {
    const stageRect = container.getBoundingClientRect();
    const agentEls = container.querySelectorAll('[data-pipeline-node="agent"]');
    const systemEls = container.querySelectorAll('[data-pipeline-node="system"]');
    const gate = document.getElementById('iris-core');

    if (!agentEls.length || !systemEls.length || !gate || stageRect.width === 0) {
      return {
        agents: [
          { x: width * 0.15, y: height * 0.22, color: AGENT_COLORS[0] },
          { x: width * 0.15, y: height * 0.44, color: AGENT_COLORS[1] },
          { x: width * 0.15, y: height * 0.66, color: AGENT_COLORS[2] }
        ],
        center: { x: width * 0.5, y: height * 0.44 },
        systems: [
          { x: width * 0.85, y: height * 0.22 },
          { x: width * 0.85, y: height * 0.44 },
          { x: width * 0.85, y: height * 0.66 }
        ]
      };
    }

    return {
      agents: Array.from(agentEls).map((el, i) => ({
        ...centerInStage(el, stageRect),
        color: AGENT_COLORS[i] || AGENT_COLORS[0]
      })),
      center: centerInStage(gate, stageRect),
      systems: Array.from(systemEls).map((el) => centerInStage(el, stageRect))
    };
  };

  function pointOnCurve(x0, y0, x1, y1, t, bowSign) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy) || 1;
    const bow = Math.min(28, len * 0.12) * bowSign;
    const px = (-dy / len) * bow;
    const py = (dx / len) * bow;
    const cp1x = x0 + dx * 0.35 + px;
    const cp1y = y0 + dy * 0.35 + py;
    const cp2x = x0 + dx * 0.7 + px;
    const cp2y = y0 + dy * 0.7 + py;
    const u = 1 - t;

    return {
      x: u * u * u * x0 + 3 * u * u * t * cp1x + 3 * u * t * t * cp2x + t * t * t * x1,
      y: u * u * u * y0 + 3 * u * u * t * cp1y + 3 * u * t * t * cp2y + t * t * t * y1
    };
  }

  class Packet {
    constructor(isBreach = false, speedMultiplier = 1) {
      const coords = getCoordinates();
      this.agentIdx = Math.floor(Math.random() * coords.agents.length);
      this.systemIdx = Math.floor(Math.random() * coords.systems.length);

      this.startX = coords.agents[this.agentIdx].x;
      this.startY = coords.agents[this.agentIdx].y;
      this.midX = coords.center.x;
      this.midY = coords.center.y;
      this.endX = coords.systems[this.systemIdx].x;
      this.endY = coords.systems[this.systemIdx].y;

      this.isBreach = isBreach;
      this.color = isBreach ? '#ef4444' : coords.agents[this.agentIdx].color;
      this.bowSign = [-1, 0, 1][this.agentIdx] || 0;
      this.progress = 0;
      this.speed = (0.012 + Math.random() * 0.008) * speedMultiplier;
      this.size = isBreach ? 5.5 : 3.8;
      this.evaluated = false;
      this.blocked = false;
      this.trail = [];
    }

    update() {
      this.progress += this.speed;

      // Calculate current position along piecewise curve
      let currentX, currentY;

      if (this.progress <= 0.5) {
        const point = pointOnCurve(
          this.startX, this.startY, this.midX, this.midY, this.progress * 2, this.bowSign
        );
        currentX = point.x;
        currentY = point.y;
      } else if (this.isBreach) {
        this.blocked = true;
        currentX = this.midX + (Math.random() - 0.5) * 12;
        currentY = this.midY + (Math.random() - 0.5) * 12;
      } else {
        const point = pointOnCurve(
          this.midX, this.midY, this.endX, this.endY, (this.progress - 0.5) * 2, this.bowSign
        );
        currentX = point.x;
        currentY = point.y;
      }

      this.trail.push({ x: currentX, y: currentY });
      if (this.trail.length > 8) this.trail.shift();

      // Check evaluation at center gate
      if (this.progress >= 0.5 && !this.evaluated) {
        this.evaluated = true;
        onPacketEvaluated(this.isBreach, this.agentIdx);
      }

      this.currentX = currentX;
      this.currentY = currentY;
    }

    draw(ctx) {
      // Draw glowing motion trail
      if (this.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length; i++) {
          ctx.lineTo(this.trail[i].x, this.trail[i].y);
        }
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size * 0.8;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.28;
        ctx.stroke();
      }

      // Draw head packet
      ctx.beginPath();
      ctx.arc(this.currentX, this.currentY, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = 0.95;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  }

  function onPacketEvaluated(isBreach, agentIdx) {
    if (isBreach) {
      if (irisCore) irisCore.classList.add('breach-alert');
      if (irisStatusText) irisStatusText.textContent = 'BLOCKED';
      setTimeout(() => {
        if (irisCore) irisCore.classList.remove('breach-alert');
        if (irisStatusText) irisStatusText.textContent = '';
      }, 1600);
    }

    // Dynamic latency fluctuations between 2.4ms and 4.2ms (always under 7ms)
    const ms = (2.4 + Math.random() * 1.8).toFixed(1);
    if (irisLatency) irisLatency.textContent = `${ms} ms`;
    if (avgLatencyEl) avgLatencyEl.textContent = `< ${ms}ms`;

    // Dynamic throughput fluctuations
    const ops = Math.floor(38800 + Math.random() * 2400);
    if (irisOps) irisOps.textContent = `${ops.toLocaleString()}/s`;
  }

  // Animation Loop
  function animateLoop(timestamp) {
    ctx.clearRect(0, 0, width, height);

    // Periodic spawning based on current mode
    if (timestamp - lastSpawn > spawnInterval) {
      lastSpawn = timestamp;
      if (currentMode === 'breach') {
        particles.push(new Packet(true, 1.2));
        currentMode = 'stream'; // Reset mode after launching breach test
        setTimeout(() => {
          btnStream.classList.add('active');
          btnBreach.classList.remove('active');
        }, 1200);
      } else if (currentMode === 'swarm') {
        // Spawn cluster
        for (let i = 0; i < 4; i++) {
          particles.push(new Packet(false, 1.4));
        }
      } else {
        particles.push(new Packet(false, 1));
      }
    }

    // Update & draw particles
    particles = particles.filter(p => {
      p.update();
      p.draw(ctx);
      if (p.isBreach && p.progress >= 0.58) return false;
      return p.progress < 1;
    });

    requestAnimationFrame(animateLoop);
  }

  requestAnimationFrame(animateLoop);

  // Mode Buttons click handlers
  if (btnStream) {
    btnStream.addEventListener('click', () => {
      currentMode = 'stream';
      spawnInterval = 180;
      btnStream.classList.add('active');
      btnBreach.classList.remove('active');
      btnSwarm.classList.remove('active');
      addLogEntry('Normal traffic. Decisions keep moving.', 'AUTHORIZED', '< 2.9ms');
      scheduleLog();
    });
  }

  if (btnBreach) {
    btnBreach.addEventListener('click', () => {
      currentMode = 'breach';
      btnBreach.classList.add('active');
      btnStream.classList.remove('active');
      btnSwarm.classList.remove('active');
      addLogEntry('Denied call held at the gate.', 'BLOCKED', '< 2.1ms', true);
      scheduleLog();
    });
  }

  if (btnSwarm) {
    btnSwarm.addEventListener('click', () => {
      currentMode = 'swarm';
      spawnInterval = 70;
      btnSwarm.classList.add('active');
      btnStream.classList.remove('active');
      btnBreach.classList.remove('active');
      addLogEntry('Many agents at once. Still under 7ms.', 'AUTHORIZED', '< 3.2ms');
      scheduleLog();
    });
  }

  // Live Micro-Telemetry Event Generator
  const sampleEvents = [
    { actor: '6.1 Sol', action: 'stripe.refunds.create($140.00)', badge: 'AUTHORIZED', latency: '< 2.9ms' },
    { actor: 'Claude Sonnet 5', action: 'aws.s3.get_object(billing_report)', badge: 'AUTHORIZED', latency: '< 3.1ms' },
    { actor: 'Grok 4.5', action: 'snowflake.query(tenants_live)', badge: 'AUTHORIZED', latency: '< 3.4ms' },
    { actor: '6.1 Sol', action: 'db.drop_database("prod_users")', badge: 'BLOCKED', latency: '< 2.1ms', isBreach: true },
    { actor: 'Claude Sonnet 5', action: 'aws.iam.create_access_key()', badge: 'BLOCKED', latency: '< 2.4ms', isBreach: true },
    { actor: 'Grok 4.5', action: 'swift.wire_transfer($50,000)', badge: 'AUTHORIZED', latency: '< 3.0ms' },
    { actor: '6.1 Sol', action: 'postgres.select(tenants=4)', badge: 'AUTHORIZED', latency: '< 2.8ms' }
  ];

  let eventIdx = 0;

  function addLogEntry(textOrAction, badgeText, latencyText, isBreach = false) {
    if (!feedList) return;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');

    const item = document.createElement('div');
    item.className = 'stream-feed-item';

    const left = document.createElement('div');
    left.className = 'feed-left';

    const timeSpan = document.createElement('span');
    timeSpan.className = 'feed-time';
    timeSpan.textContent = timeStr;

    const actionSpan = document.createElement('span');
    actionSpan.className = 'feed-action';
    actionSpan.textContent = textOrAction;

    left.appendChild(timeSpan);
    left.appendChild(actionSpan);

    const badge = document.createElement('span');
    badge.className = `feed-badge ${isBreach ? 'badge-blocked' : 'badge-ok'}`;
    badge.textContent = `[${badgeText}] ${latencyText}`;

    item.appendChild(left);
    item.appendChild(badge);

    feedList.prepend(item);

    // Keep feed trimmed
    while (feedList.children.length > 4) {
      feedList.removeChild(feedList.lastChild);
    }
  }

  // Prepopulate 3 lines
  sampleEvents.slice(0, 3).forEach(ev => {
    addLogEntry(`${ev.actor}: ${ev.action}`, ev.badge, ev.latency, ev.isBreach);
  });

  // Normal traffic ticks about every 2.2s. Many agents is the only mode
  // that accelerates the log.
  let logTimer = null;
  const LOG_NORMAL_MS = 2200;
  const LOG_SWARM_MS = 280;

  function pushSampleEvent() {
    const ev = sampleEvents[eventIdx % sampleEvents.length];
    eventIdx++;
    addLogEntry(`${ev.actor}: ${ev.action}`, ev.badge, ev.latency, ev.isBreach);
  }

  function scheduleLog() {
    clearTimeout(logTimer);
    const delay = currentMode === 'swarm' ? LOG_SWARM_MS : LOG_NORMAL_MS;
    logTimer = setTimeout(() => {
      pushSampleEvent();
      scheduleLog();
    }, delay);
  }

  scheduleLog();
}

/**
 * 3) Navigation Active Link Highlighting
 */
function initNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.sd-unified-nav .sd-nav-link');

  const updateActive = () => {
    const scrollY = window.pageYOffset;
    let currentId = '';

    sections.forEach(section => {
      const top = section.offsetTop - 160;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      desktopLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', updateActive);
}

/**
 * 5) Minimal Request Access Form
 */
function initAccessForm() {
  const form = document.getElementById('access-form');
  const successMsg = document.getElementById('form-success-msg');
  if (!form || !successMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const label = form.querySelector('.btn-label');
    const input = form.querySelector('input');
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = '0.7';
    }
    if (label) label.textContent = 'Submitting...';

    setTimeout(() => {
      if (input) input.value = '';
      if (label) label.textContent = 'Received';
      successMsg.style.display = 'block';
    }, 450);
  });
}
