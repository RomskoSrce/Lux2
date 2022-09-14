/*
*/
$(document).ready(function () {
    var input = $('.field').find('input, textarea');
    input.keyup(function () {
      inputTest(this);
    });
  });
  
  function inputTest(that) {
    var field = $(that).closest('.field');
    var form = $(that).closest('form, .form');
    var length = $.trim($(that).val()).length;
  
    //  FILLED
    if (length > 0) field.addClass('filled');else field.removeClass('filled');
  
    //  VALIDATED
    if (length >= 4) {
      field.addClass('validated');
      form.addClass('validated');
    } else {
      field.removeClass('validated');
      form.removeClass('validated');
    }
  }
  var Timer = {
    length: null,
    time: null,
    selector: null,
    interval: null,
    callback: null,
  
    //  RUN
    run: function (selector, callback, length) {
      Timer.length = length;
      Timer.time = Timer.length;
      Timer.selector = selector;
      Timer.callback = callback;
      $(Timer.selector).text(Timer.length);
      Timer.interval = setInterval(Timer.count, 1000);
    },
  
    //  COUNT
    count: function () {
      Timer.time = Timer.time - 1;
      $(Timer.selector).text(Timer.time);
      if (Timer.time <= 0) {
        if (typeof Timer.callback === 'function' && Timer.callback) Timer.callback();
        Timer.reset();
      }
    },
  
    //  RESET
    reset: function () {
      clearInterval(Timer.interval);
      Timer.length = null;
      Timer.time = null;
      Timer.selector = null;
      Timer.interval = null;
      Timer.callback = null;
    }
  };
  var Identity = {
    duration: 1400,
    delay: 500,
    iteration: 0,
    processing: false,
    enough: false,
    interval: null,
    callback: null,
    status: 'loading',
    id: '#identity',
    selector: '#identity div',
    classes: 'working rest robot',
  
    //  WORK
    work: function () {
      if (Identity.status != 'loading') Identity.status = 'working';
      Identity.wait(function () {
        $(Identity.id).addClass('working');
      });
    },
  
    //  ROBOT
    robot: function () {
      Identity.status = 'robot';
      Identity.wait(function () {
        $(Identity.id).addClass('robot');
      });
    },
  
    //  REST
    rest: function () {
      Identity.abort();
      Identity.status = 'rest';
      setTimeout(function () {
        Identity.abort();
        $(Identity.id).addClass('rest');
      }, Identity.delay);
    },
  
    //  WAIT
    wait: function (call) {
      if (Identity.processing != true) {
        Identity.abort();
        Identity.processing = true;
  
        setTimeout(function () {
          if (typeof call === 'function' && call) call();
          Identity.waiting();
          Identity.interval = setInterval(Identity.waiting, Identity.duration);
        }, Identity.delay);
      }
    },
  
    //  WAITING
    waiting: function () {
      if (Identity.enough != true) {
        ++Identity.iteration;
        return;
      }
  
      Identity.stopping();
    },
  
    //  STOP
    stop: function (callback) {
      setTimeout(function () {
        if (Identity.processing == true) {
          Identity.enough = true;
          Identity.callback = callback;
  
          $(Identity.selector).attr('style', 'animation-iteration-count: ' + Identity.iteration + '; -webkit-animation-iteration-count: ' + Identity.iteration + ';');
        }
      }, Identity.delay);
    },
  
    //  STOPPING
    stopping: function () {
      clearInterval(Identity.interval);
      Identity.rest();
  
      if (typeof Identity.callback === 'function' && Identity.callback) Identity.callback();
      Identity.reset();
    },
  
    //  ABORT
    abort: function () {
      if (Identity.status == 'robot') $(Identity.id).removeClass('robot');else if (Identity.status != 'loading' && Identity.processing != true) $(Identity.id).removeClass(Identity.classes + ' loading');else $(Identity.id).removeClass(Identity.classes);
    },
  
    //  RESET
    reset: function () {
      Identity.iteration = 0;
      Identity.processing = false;
      Identity.enough = false;
      Identity.interval = null;
      Identity.callback = null;
  
      $(Identity.selector).removeAttr('style');
    }
  };
  var Stars = {
    canvas: null,
    context: null,
    circleArray: [],
    colorArray: ['#4c1a22', '#4c1a23', '#5d6268', '#1f2e37', '#474848', '#542619', '#ead8cf', '#4c241f', '#d6b9b1', '#964a47'],
  
    mouseDistance: 50,
    radius: .5,
    maxRadius: 1.5,
  
    //  MOUSE
    mouse: {
      x: undefined,
      y: undefined,
      down: false,
      move: false
    },
  
    //  INIT
    init: function () {
      this.canvas = document.getElementById('stars');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.style.display = 'block';
      this.context = this.canvas.getContext('2d');
  
      window.addEventListener('mousemove', this.mouseMove);
      window.addEventListener('resize', this.resize);
  
      this.prepare();
      this.animate();
    },
  
    //  CIRCLE
    Circle: function (x, y, dx, dy, radius, fill) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.minRadius = this.radius;
  
      this.draw = function () {
        Stars.context.beginPath();
        Stars.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        Stars.context.fillStyle = fill;
        Stars.context.fill();
      };
  
      this.update = function () {
        if (this.x + this.radius > Stars.canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
        if (this.y + this.radius > Stars.canvas.height || this.y - this.radius < 0) this.dy = -this.dy;
  
        this.x += this.dx;
        this.y += this.dy;
  
        //  INTERACTIVITY
        if (Stars.mouse.x - this.x < Stars.mouseDistance && Stars.mouse.x - this.x > -Stars.mouseDistance && Stars.mouse.y - this.y < Stars.mouseDistance && Stars.mouse.y - this.y > -Stars.mouseDistance) {
          if (this.radius < Stars.maxRadius) this.radius += 1;
        } else if (this.radius > this.minRadius) {
          this.radius -= 1;
        }
  
        this.draw();
      };
    },
  
    //  PREPARE
    prepare: function () {
      this.circleArray = [];
  
      for (var i = 0; i < 1200; i++) {
        var radius = Stars.radius;
        var x = Math.random() * (this.canvas.width - radius * 2) + radius;
        var y = Math.random() * (this.canvas.height - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 1.5;
        var dy = (Math.random() - 1) * 1.5;
        var fill = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
  
        this.circleArray.push(new this.Circle(x, y, dx, dy, radius, fill));
      }
    },
  
    //  ANIMATE
    animate: function () {
      requestAnimationFrame(Stars.animate);
      Stars.context.clearRect(0, 0, Stars.canvas.width, Stars.canvas.height);
  
      for (var i = 0; i < Stars.circleArray.length; i++) {
        var circle = Stars.circleArray[i];
        circle.update();
      }
    },
  
    //  MOUSE MOVE
    mouseMove: function (event) {
      Stars.mouse.x = event.x;
      Stars.mouse.y = event.y;
    },
  
    //  RESIZE
    resize: function () {
      Stars.canvas.width = window.innerWidth;
      Stars.canvas.height = window.innerHeight;
    }
  };
  var renderer, scene, camera, ww, wh, particles;
  
  ww = window.innerWidth, wh = window.innerHeight;
  
  var centerVector = new THREE.Vector3(0, 0, 0);
  var previousTime = 0;
  speed = 10;
  isMouseDown = false;
  
  var getImageData = function (image) {
  
      var canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
  
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
  
      return ctx.getImageData(0, 0, image.width, image.height);
  };
  
  function getPixel(imagedata, x, y) {
      var position = (x + imagedata.width * y) * 4,
          data = imagedata.data;
      return { r: data[position], g: data[position + 1], b: data[position + 2], a: data[position + 3] };
  }
  
  var drawTheMap = function () {
  
      var geometry = new THREE.Geometry();
      var material = new THREE.PointCloudMaterial();
      material.vertexColors = true;
      material.transparent = true;
      for (var y = 0, y2 = imagedata.height; y < y2; y += 1) {
          for (var x = 0, x2 = imagedata.width; x < x2; x += 1) {
              if (imagedata.data[x * 4 + y * 4 * imagedata.width] > 0) {
  
                  var vertex = new THREE.Vector3();
                  vertex.x = x - imagedata.width / 2 + (500 - 440 * .5);
                  vertex.y = -y + imagedata.height / 2;
                  vertex.z = -Math.random() * 500;
  
                  vertex.speed = Math.random() / speed + 0.015;
  
                  var pixelColor = getPixel(imagedata, x, y);
                  var color = "rgb(" + pixelColor.r + ", " + pixelColor.g + ", " + pixelColor.b + ")";
                  geometry.colors.push(new THREE.Color(color));
                  geometry.vertices.push(vertex);
              }
          }
      }
      particles = new THREE.Points(geometry, material);
  
      scene.add(particles);
  
      requestAnimationFrame(render);
  };
  
  var init = function () {
      renderer = new THREE.WebGLRenderer({
          canvas: document.getElementById("yahia"),
          antialias: true,
          alpha: true
      });
      renderer.setSize(ww, wh);
  
      scene = new THREE.Scene();
  
      camera = new THREE.OrthographicCamera(ww / -2, ww / 2, wh / 2, wh / -2, 1, 1000);
      camera.position.set(0, -20, 4);
      camera.lookAt(centerVector);
      scene.add(camera);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
  
      imagedata = getImageData(image);
      drawTheMap();
  
      window.addEventListener('mousemove', onMousemove, false);
      window.addEventListener('mousedown', onMousedown, false);
      window.addEventListener('mouseup', onMouseup, false);
      window.addEventListener('resize', onResize, false);
  };
  var onResize = function () {
      ww = window.innerWidth;
      wh = window.innerHeight;
      renderer.setSize(ww, wh);
      camera.left = ww / -2;
      camera.right = ww / 2;
      camera.top = wh / 2;
      camera.bottom = wh / -2;
      camera.updateProjectionMatrix();
  };
  
  var onMouseup = function () {
      isMouseDown = false;
  };
  var onMousedown = function (e) {
      isMouseDown = true;
      lastMousePos = { x: e.clientX, y: e.clientY };
  };
  var onMousemove = function (e) {
      if (isMouseDown) {
          camera.position.x += (e.clientX - lastMousePos.x) / 100;
          camera.position.y -= (e.clientY - lastMousePos.y) / 100;
          camera.lookAt(centerVector);
          lastMousePos = { x: e.clientX, y: e.clientY };
      }
  };
  
  var render = function (a) {
  
      requestAnimationFrame(render);
  
      particles.geometry.verticesNeedUpdate = true;
      if (!isMouseDown) {
          camera.position.x += (0 - camera.position.x) * 0.06;
          camera.position.y += (0 - camera.position.y) * 0.06;
          camera.lookAt(centerVector);
      }
  
      renderer.render(scene, camera);
  };
  
  var imgData = ' data:image/png;base64,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';
  
  var image = document.createElement("img");
  image.src = imgData;
  var Submit = {
  
    //  DATA
    data: function (template, fields) {
      var data = {};
      for (i = 0; i < fields.length; i++) {
        var field = $(fields[i]);
        var name = field.attr('name');
        var value = field.val().replace(/(?:\r\n|\r|\n)/g, '<br>');
        data[name] = value;
      }
  
      return data;
    },
  
    //  PUSH
    push: function (form) {
      var template = $('.template[data-template=' + form + ']');
      var fields = template.find('.field input, .field textarea');
  
      //  WAITING
      Submit.view('[data-status=waiting]', template);
  
      //  AJAX
      $.ajax({
        type: 'POST',
        url: 'includes/php/' + form + '.php',
        data: { dd: JSON.stringify(Submit.data(template, fields)) },
        dataType: 'json',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          Submit.callback('error', form, template, fields);
        },
        success: function (data) {
          Submit.callback('success', form, template, fields);
        }
      });
    },
  
    //  CALLBACK
    callback: function (status, form, template, fields) {
      setTimeout(function () {
  
        //  SUCCESS
        if (status == 'success') {
          template.find('.form .status').removeClass('current');
          fields.closest('.field').fadeOut(700);
          fields.closest('.form').find('.submit').fadeOut(700);
          Identity.stop();
  
          if (form == 'secret') secretAvailability = false;else if (form == 'opinion') opinionAvailability = false;
  
          setTimeout(function () {
            fields.closest('.form').find('.submit').remove();
            fields.closest('.field').remove();
            template.find('.form .status[data-status=success]').addClass('current');
          }, 750);
        }
  
        //  ERROR
        else {
            Submit.view('[data-status=error]', template);
            setTimeout(function () {
              Submit.view(':not([data-status])', template);
            }, 6000);
          }
      }, 4000);
    },
  
    //	VIEW
    view: function (selector, template) {
      template.find('.form .status').removeClass('current');
      template.find('.form .status' + selector).addClass('current');
    },
  
    //	LISTEN
    listen: function (selector) {
      $(selector).on('click', function (e) {
        if ($(this).closest('.form').hasClass('validated')) {
          var form = $(this).attr('data-form');
          Submit.push(form);
        }
  
        e.preventDefault();
      });
    }
  };
  var Router = {
      wrapper: [],
      location: null,
  
      //	ROUTE
      route: function (location, callback) {
          Identity.work();
          Router.location = Router.processLocation(location);
  
          //	ROUTES
          Router.routes(callback);
      },
  
      //	PROCESS LOCATION
      processLocation: function (location) {
          if (location === undefined) location = window.location.hash;
  
          return location.replace('#', '');
      },
  
      //	CALLBACK
      callback: function (callback) {
          setTimeout(function () {
              Identity.stop();
        Router.updateWrapper();
        Router.updateTemplate(Router.wrapper[0]);
        window.location.hash = Router.location;
        Router.location = null;
  
        //  CALLBACKS
        Router.callbacks(Router.wrapper[0]);
        if (typeof callback === 'function' && callback) callback();
          }, 200);
      },
  
      //	UPDATE TEMPLATE
      updateTemplate: function (template) {
          var templates = $('.template');
          var current = $('.template[data-template=' + template + ']');
  
          templates.removeClass('current');
          setTimeout(function () {
              templates.hide();
              current.show().addClass('current');
          }, 1120);
      },
  
      //	UPDATE WRAPPER
      updateWrapper: function (push, pull) {
          if (push) Router.push(push);
          if (pull) Router.pull(pull);
  
          var wrapper = Router.wrapper.toString().replace(/,/g, ' ');
          $('.wrapper').attr('class', 'wrapper ' + wrapper);
      },
  
      //	PUSH
      push: function (items) {
          items = items.split(' ');
  
          for (i = 0; i < items.length; i++) {
              if (!Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.push(items[i]);
          }
      },
  
      //	PULL
      pull: function (items) {
          items = items.split(' ');
  
          for (i = 0; i < items.length; i++) {
              if (Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.splice(Router.wrapper.indexOf(items[i]), 1);
          }
      },
  
      //	LISTEN
      listen: function () {
          $('.wrapper').on('click', '.router', function (e) {
              Router.route($(this).attr('href'), window[$(this).attr('data-callback')]);
              e.preventDefault();
          });
  
          window.addEventListener('popstate', function (e) {
              Router.route(undefined);
          });
      }
  };
  Router.routes = function (callback) {
    Router.wrapper = [];
    var location = Router.location.split('/').filter(Boolean);
  
    //  HOME
    Router.push('home');
  
    //  CALLBACK
    Router.callback(callback);
  };
  Router.callbacks = function (wrapper) {
    if (wrapper == 'secret') secret();else if (wrapper == 'opinion') opinion();else if (wrapper == 'bucketAll') bucketAll();else if (wrapper == 'notFound') notFound();
  };
  var secretAvailability = true;
  function secret() {
    if (secretAvailability == true) {
      setTimeout(function () {
        var input = $('.template[data-template=secret] .field').find('input, textarea');
  
        input.focus();
        Identity.robot();
      }, Identity.duration * 1.25);
    }
  }
  var opinionAvailability = true;
  function opinion() {
    if (opinionAvailability == true) {
      setTimeout(function () {
        var input = $('.template[data-template=opinion] .field').find('input, textarea');
  
        input.focus();
        Identity.robot();
      }, Identity.duration * 1.25);
    }
  }
  function bucketAll() {
    var list = $('.template[data-template=bucketAll] .bucketList');
    var link = list.find('li.archived a');
  
    //  LISTEN
    link.hover(function () {
      list.addClass('hover');
    }, function () {
      list.removeClass('hover');
    });
  }
  function notFound() {
    setTimeout(function () {
      Timer.run('.template[data-template=notFound] time', function () {
        Router.route('#');
      }, 5);
    }, Identity.duration * 1.25);
  }
  
  function notFoundCallback() {
    Timer.reset();
  }
  var md = new MobileDetect(window.navigator.userAgent);
  
  $(document).ready(function () {
    Identity.work();
    $('.template main').mCustomScrollbar({
      theme: 'dark'
    });
  });
  
  function loadProject() {
    Router.route(undefined, function () {
  
      //  CALLBACK
      Router.listen();
      Submit.listen('.submit');
      if (!md.mobile()) {
        Stars.init();
        init();
      }
      setTimeout(function () {
        $('#signature').removeClass('loading');
      }, Identity.delay * 1.5);
    });
  };
  
  loadProject();
