import Image from "next/image"

export default function getSVG(svg, width = 16, height) {
    if (!height) {
        height = width;
    }
    const svg1 = <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg"><use href={`/static/svg/${svg}.svg#svg`} width={width} height={height} /></svg>
    //console.log(svg1)

    const svg_image = <Image src={`/static/svg/${svg}.svg`} width={width} height={height} className='svg' />

    return (svg1)
}