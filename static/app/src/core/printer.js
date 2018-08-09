/*
* @Author: dser.wei
* @Date:   2016-06-27 15:51:37
* @Last Modified by:   dser.wei
* @Last Modified time: 2016-06-27 15:52:30
*/

'use strict';

var util = require('./util');


module.exports = {

    //打印调试信息
    log: function(v) {
        if (!util.ie && __DEV__) {
            console.log('---------------Debug--------------');
            console.log(v);
            //console.log('----------------------------------');
        }
    },

    //打印宣传信息
    ad: function(v) {
        if (!util.ie && !__DEV__) {
            if (typeof v == 'object') {
                var pattern = '';
                v.forEach(function(item) {
                    pattern = pattern + '\n' + item;
                });
                console.log('--------------测聘网·温馨提示--------------');
                console.log(pattern);
                //console.log('------------------------------------------');
            } else {
                console.log('--------------测聘网·温馨提示--------------');
                console.log(v);
                //console.log('------------------------------------------');
            }
        }
    },

    //打印测聘logo
    adLogo: function() {
        var cepinLogo = [
            '               ff,                                                              ',
            '               ff,                                                              ',
            '   .,          ff,         .,       ;          ;;         ,t      .             ',
            '   jff         fj.        fff,      fj.fjjfj j f, jfffffjjffjjf  fffffffffffj   ',
            '   jff:        .;        :fff,      ;f;f;:if.f.f: ,f.;f;ftfjtjf  f,::..::..;f   ',
            '   .ffff      .:,:      :ffft         it.fii;j;j  ;j tijftfjtfi  j   ij  .jit   ',
            '    .fff;  ,jjfiitjjt   jfft       jt f,,if:j,fj  ffff:f:.f..f:  fij j.  j,f,   ',
            '     .jj. jt        ,j; fj.        .fif.t,j f.ff  f.,j jffffff  :f.fff,ftj j.   ',
            '        .j: ,tittti,  jt              j.f.j j jt  f:jf;iiiiiii, it .f. ffi j    ',
            '       .j. ittttttttt, jt           j;j,j.f j j, .fjff:,f,,,,,  f, tf; jf:.f    ',
            '      jf, ittti,:,ittt, ft          j,ftj,j:f:f. ,f jj tfjjjj;  j fj,f;fff,f    ',
            '     .ff :ttti:   .itti jf         ;f;tffit:i;j  ;j.ff.ifjjjff  j:jt ff,ff;t    ',
            '    .ffj itt,       :tt, fft       f. ;fii   j; jfffft      ji  fj.  jt .:f,    ',
            '    fff::ttt    :    tti ffft     fi ff  f.jff.    ,f fffttfj  :f    : :t;f.    ',
            '   tffj itt:   itt.  ttt jfff     i :,   ,: :      ::  .,;;:   :,      .;i:     ',
            '   fffi itt   ;ttttitttt tfff.                                                  ',
            '   fffi itt.  :ttti.,ttt tfff                                                   ',
            '   :ffi itti   ,t;   iii ffff      :fjt.jjj  iti ; itii   ,ii; iii  ;i;,;i;.    ',
            '    jfi itti    .    iti fff;      j. ,j; :,i. :,i,;  t   i  ,,: ; .i .;. :i    ',
            '     ji ittti       ;tt:.fj;      :.  .ffffj:   t;;    , i    ;  .ii   ,   i    ',
            '      t ittttt,   ,ittt fj        .i ..;   .i  ;:,.   .. ,.  .i  ;i,   i   ;    ',
            '        itttttttitttti ;j          .i: .;; , ;: ::    : , :;:  ;: ,    ,   ,    ',
            '        iti iittttti; ,j                                                        ',
            '        iti   :;;,   tf                                                         ',
            '        iti :      :ij:                                                         ',
            '        ;ti jjjfjfjj'
        ];
        var pattern = '';
        cepinLogo.forEach(function(item) {
            pattern = pattern + '\n' + item;
        });
        console.log(pattern);
    }

}
