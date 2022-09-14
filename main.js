/*
 *  yahiarefaiea-official-website-beta 1.0.0
 *  
 *  I’m a 21 years old handsome guy who grows up in a small town in Syria.
 *  http://beta.yahiarefaiea.com/
 *  hello@yahiarefaiea.com
 *  
 *  Last update on: 2018/10/24
 *  ©2018 Yahia Refaiea. all rights reserved.
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
  
  var imgData = ' data:image/jpeg;base64,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';
  
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
