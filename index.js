window.addEventListener('DOMContentLoaded', eve => {
    
    const btnsActions = document.querySelectorAll('.btn-action')
    const tablo = document.querySelector('#tablo')
    const action_p = {
        f_n: '',
        action: '',
        s_n: ''
    }

    btnsActions.forEach(btn => {
        btn.addEventListener('click', e => {
            const t = e.target
            if(t.matches('.numb')){
                tablo.value += t.textContent 
                if(action_p.f_n) {
                    action_p.s_n += t.textContent 
                } 
            } else if(t.matches('#ac')){
                tablo.value = '' 
                clear_action()
            } else if(t.matches('#plus_minus')) {
                if(action_p.f_n == '') {
                    tablo.value = minusPlus(tablo.value)
                } else if(action_p.f_n && action_p.action == '') {
                    tablo.value = minusPlus(action_p.f_n)
                } else if(action_p.s_n) {
                    const str_n = +action_p.f_n < 0 ? tablo.value.replace(/[-]/, '').replace(/[-+÷×%]/, ' ').split(' ') : tablo.value.replace(/[-+÷×%]/, ' ').split(' ')
                    const action_p_type = actionType(action_p.action)
                    action_p.s_n = minusPlus(+str_n[1])
                    const str_ready = String(-(str_n[0])) + action_p_type + minusPlus(+str_n[1])
                    tablo.value = str_ready
                }
            } else if(t.matches('.action-imp')) {
                action_p.f_n = action_p.f_n ? action_p.f_n : tablo.value
                action_p.action = t.dataset.action
                tablo.value += t.textContent
                setDisable(true)
            } else if(t.matches('#answer')) {
                const answer = eval(action_p.f_n + action_p.action + action_p.s_n)
                tablo.value = answer
                clear_action(answer)
                setDisable(false)
            }
        })
    })

    function clear_action(answer) {
        action_p.f_n = answer ? answer : ''
        action_p.action = ''
        action_p.s_n = ''
    }
    function minusPlus (number) {
        return number > 0 ? -(+number) : Math.abs(number)
    }

    function actionType(type) {
        return type == '*' ? '×' : (type == '/') ? '÷' : type
    }

    function setDisable(a) {
        const buttActions = document.querySelectorAll('.action-imp')
        buttActions.forEach(ele => {
            ele.disabled = a 
        })
    }
})