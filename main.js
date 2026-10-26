/**
 * Ostrelio — Runtime Authorization for AI Agents
 * Page interactions
 */

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = motionPreference.matches;

function initMotionPreference() {
  const video = document.getElementById('background-video');

  const setPaused = (paused) => {
    motionPaused = paused;
    document.documentElement.dataset.motionPaused = String(paused);
    if (video) {
      if (paused) video.pause();
      else video.play().catch(() => {});
    }
  };

  motionPreference.addEventListener('change', (event) => setPaused(event.matches));
  setPaused(motionPaused);
}

document.addEventListener('DOMContentLoaded', () => {
  initMotionPreference();
  initStatsCountUp();
  initPipelineAnimation();
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

function initPipelineAnimation() {
  const canvas = document.getElementById('pipeline-canvas');
  const container = document.querySelector('.pipeline-stage');
  const irisLatency = document.getElementById('iris-latency');
  const irisOps = document.getElementById('iris-ops');
  const avgLatencyEl = document.getElementById('live-avg-latency');
  const feedList = document.getElementById('stream-feed-list');


  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
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
  const spawnInterval = 180;
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
    constructor() {
      const coords = getCoordinates();
      this.agentIdx = Math.floor(Math.random() * coords.agents.length);
      this.systemIdx = Math.floor(Math.random() * coords.systems.length);

      this.startX = coords.agents[this.agentIdx].x;
      this.startY = coords.agents[this.agentIdx].y;
      this.midX = coords.center.x;
      this.midY = coords.center.y;
      this.endX = coords.systems[this.systemIdx].x;
      this.endY = coords.systems[this.systemIdx].y;

      this.color = coords.agents[this.agentIdx].color;
      this.bowSign = [-1, 0, 1][this.agentIdx] || 0;
      this.progress = 0;
      this.speed = 0.012 + Math.random() * 0.008;
      this.size = 3.8;
      this.evaluated = false;
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
        onPacketEvaluated();
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

  function onPacketEvaluated() {
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
    if (motionPaused) {
      requestAnimationFrame(animateLoop);
      return;
    }
    ctx.clearRect(0, 0, width, height);

    // Default traffic stream.
    if (timestamp - lastSpawn > spawnInterval) {
      lastSpawn = timestamp;
      particles.push(new Packet());
    }

    // Update & draw particles
    particles = particles.filter(p => {
      p.update();
      p.draw(ctx);
      return p.progress < 1;
    });

    requestAnimationFrame(animateLoop);
  }

  // Illustrative decision feed.
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

  function pushSampleEvent() {
    const ev = sampleEvents[eventIdx % sampleEvents.length];
    eventIdx++;
    addLogEntry(`${ev.actor}: ${ev.action}`, ev.badge, ev.latency, ev.isBreach);
  }

  function scheduleLog() {
    setTimeout(() => {
      if (!motionPaused) pushSampleEvent();
      scheduleLog();
    }, 2200);
  }

  requestAnimationFrame(animateLoop);
  scheduleLog();
}

/**
 * 5) Minimal Request Access Form
 */
function initAccessForm() {
  const form = document.getElementById('access-form');
  const successMsg = document.getElementById('form-success-msg');
  const errorMsg = document.getElementById('form-error-msg');
  if (!form || !successMsg) return;

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrpbjabw';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const label = form.querySelector('.btn-label');
    const input = form.querySelector('input[type="email"]');
    if (!input) return;

    const originalLabel = label ? label.textContent : 'Request Priority Access';
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = '0.7';
    }
    if (label) label.textContent = 'Submitting...';
    successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: input.value,
          _subject: 'Priority waitlist',
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = Array.isArray(data.errors) && data.errors.length
          ? data.errors.map((err) => err.message).filter(Boolean).join(' ')
          : '';
        throw new Error(message || 'Could not join the waitlist. Try again.');
      }

      input.value = '';
      if (label) label.textContent = 'Received';
      successMsg.style.display = 'block';
    } catch (err) {
      if (label) label.textContent = originalLabel;
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '';
      }
      if (errorMsg) {
        errorMsg.textContent = err instanceof Error && err.message
          ? err.message
          : 'Could not join the waitlist. Try again.';
        errorMsg.style.display = 'block';
      }
    }
  });
}
