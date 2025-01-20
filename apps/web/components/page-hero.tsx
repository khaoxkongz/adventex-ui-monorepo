import * as React from "react"
import Image, { StaticImageData } from "next/image"

import { cn } from "@workspace/ui/lib/utils"

const PageHero = ({
  children,
  className,
  ref,
  ...props
}: {
  children: React.ReactNode
  className?: string
  ref?: React.Ref<HTMLDivElement>
}) => {
  return (
    <section ref={ref} className={cn("relative mb-8", className)} {...props}>
      {children}
    </section>
  )
}
PageHero.displayName = "PageHero"

const PageHeroContent = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className="overflow-hidden">
      <div className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </div>
  )
}
PageHeroContent.displayName = "PageHeroContent"

const PageHeroItem = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    >
      {children}
    </div>
  )
}
PageHeroItem.displayName = "PageHeroItem"

const PageHeroImage = ({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: {
  src: string | StaticImageData
  alt: string
  width: number
  height: number
  className?: string
}) => {
  return (
    <div className="min-w-0 shrink-0 grow-0 basis-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("size-full rounded-lg object-contain", className)}
        {...props}
      />
    </div>
  )
}
PageHeroImage.displayName = "PageHeroImage"

const PageHeroText = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  )
}
PageHeroText.displayName = "PageHeroText"

const PageHeroTitle = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h1 className={cn("mb-4 text-4xl font-bold", className)} {...props}>
      {children}
    </h1>
  )
}
PageHeroTitle.displayName = "PageHeroTitle"

const PageHeroDescription = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <p
      className={cn("max-w-prose pb-4 text-lg text-gray-600", className)}
      {...props}
    >
      {children}
    </p>
  )
}
PageHeroDescription.displayName = "PageHeroDescription"

const PageHeroFooter = () => {
  return (
    <React.Fragment>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,87,34,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,87,34,0.05),transparent_50%)]" />
    </React.Fragment>
  )
}
PageHeroFooter.displayName = "PageHeroFooter"

export {
  PageHero,
  PageHeroContent,
  PageHeroItem,
  PageHeroImage,
  PageHeroText,
  PageHeroTitle,
  PageHeroDescription,
  PageHeroFooter,
}
