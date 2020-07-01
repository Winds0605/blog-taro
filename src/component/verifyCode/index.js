import Taro, { Component } from '@tarojs/taro'
import { View, Canvas, Input } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

    componentWillMount () { }

    componentDidMount () {
        this.loadVerCode()
    }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    state = {
        width: 120,
        height: 45,
        verCode: ''
    }

    rc = (min, max) => {
        var r = this.rn(min, max);
        var g = this.rn(min, max);
        var b = this.rn(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    rn = (max, min) => {
        return parseInt(Math.random() * (max - min)) + min
    }

    loadVerCode = () => {
        console.log('start');
        let context = Taro.createCanvasContext('imgcanvas', this),
            w = this.state.width,
            h = this.state.height;
        context.setFillStyle("white");
        context.setLineWidth(5);
        context.fillRect(0, 0, w, h);

        let pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "I", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "S", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
            // 存储选中的值
            str = '';

        // 随机选择字母
        for (let i = 0; i < 4; i++) {
            let c = pool[this.rn(0, pool.length - 1)];
            let deg = this.rn(-30, 30);
            context.setFontSize(18);
            context.setTextBaseline("top");
            context.setFillStyle(this.rc(80, 150));
            context.save();
            context.translate(30 * i + 15, parseInt(h / 1.5));
            context.rotate(deg * Math.PI / 180);
            context.fillText(c, -15 + 5, -15);
            context.restore();
            str += c;
        }

        Taro.setStorage({
            key: 'imgcode',
            data: str,
        });

        // 背景的小圆圈，i越大，越模糊
        for (let i = 0; i < 340; i++) {
            context.beginPath();
            context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
            context.closePath();
            context.setFillStyle(this.rc(150, 200));
            context.fill();
        }

        context.draw();
        console.log('end');
    }

    upload = () => {
        const verCode = this.state.verCode.toUpperCase()
        let imgCode = Taro.getStorageSync('imgcode')
        console.log(verCode, imgCode);

        if (verCode == imgCode) {
            Taro.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
            })
        } else {
            Taro.showToast({
                title: '失败',
                icon: 'none',
                duration: 2000
            })
        }
    }


    verChage = (e) => {
        this.setState({
            verCode: e.detail.value
        })
    }

    render () {
        const { width, height } = this.state
        return (
            <View className='index'>
                <View className='ver'>
                    <Input className='ver-input' maxLength={4} onChange={this.verChage.bind(this)} placeholder='请输入验证码'></Input>
                    <Canvas canvasId='imgcanvas' style={`width:${width}px;height:${height}px;`} onClick={this.loadVerCode.bind(this)}></Canvas>

                    <View className='bottom' onClick={this.upload.bind(this)}>提 交</View>
                </View>

            </View>
        )
    }
}
