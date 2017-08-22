
goog.module('paper.ToastTest');
goog.setTestOnly('paper.ToastTest');

var testSuite = goog.require('goog.testing.testSuite');
var dom = goog.require('goog.dom');
var classlist = goog.require('goog.dom.classlist');
var soy = goog.require('goog.soy');
var paper = goog.require('paper');
var Toast = goog.require('paper.Toast');


var sandbox = dom.getElement('sandbox');


testSuite({


    setUp: function() {
      this.toast = new Toast();
    },


    tearDown: function() {
      this.toast.dispose();
      this.clearSandbox();
    },


    clearSandbox: function() {
      dom.removeChildren(sandbox);  
    },


    testTempaltes: function() {
      // 
      soy.renderElement(sandbox, paper.toast);
      var elems = dom.getChildren(sandbox);
      assertEquals(elems.length, 1);
      var elem = elems[0];
      assertEquals(elem.id, '');
      assertNull(elem.getAttribute('duration'));
      assertEquals(elem.className, 'paper-toast');
      assertEquals(dom.getChildren(elem).length, 0);

      //
      this.clearSandbox();
      soy.renderElement(sandbox, paper.toast, {
          id: 'toast0',
          content: 'message',
          opened: true,
          fitBottom: true,
          capsule: true,
          duration: 300 
      });
      var elem = dom.getChildren(sandbox)[0];
      assertEquals(elem.id, 'toast0');
      assertEquals(parseInt(elem.getAttribute('duration')), 300);
      assertTrue(classlist.contains(elem, 'paper-toast-open'));
      assertTrue(classlist.contains(elem, 'paper-toast-fit-bottom'));
      assertTrue(classlist.contains(elem, 'paper-toast-capsule'));
      assertEquals(dom.getTextContent(elem), 'message');

      //
      this.clearSandbox();
      soy.renderElement(sandbox, paper.toast, {
          content: '<a href="#">link</a>',
          duration: 0
      });
      var elem = dom.getChildren(sandbox)[0];
      assertEquals(parseInt(elem.getAttribute('duration')), 0);
      var children = dom.getChildren(elem); 
      assertEquals(children.length, 1);
      var child = children[0];
      assertEquals(child.tagName, 'A');
    },


    testGetSetDuration: function() {
      assertEquals(this.toast.getDuration(), 3000);

      this.toast.setDuration(100);
      assertEquals(this.toast.getDuration(), 100);
    },


    testRender: function() {
      this.toast.render(sandbox);
      var elems = dom.getChildren(sandbox);
      assertEquals(elems.length, 1);
      var elem = elems[0];
      assertEquals(elem.id, '');
      assertNull(elem.getAttribute('duration'));
      assertEquals(elem.className, 'paper-toast');
      assertEquals(dom.getChildren(elem).length, 0);
      
      this.toast.dispose();
      
      this.toast = new Toast('message');
      this.toast.setOpen(true)
        .setFitBottom(true)
        .setCapsule(true)
        .render(sandbox);
      var elem = dom.getChildren(sandbox)[0];
      assertTrue(classlist.contains(elem, 'paper-toast-open'));
      assertTrue(classlist.contains(elem, 'paper-toast-fit-bottom'));
      assertTrue(classlist.contains(elem, 'paper-toast-capsule'));
      assertEquals(dom.getTextContent(elem), 'message');
      this.toast.dispose();
    }



});

