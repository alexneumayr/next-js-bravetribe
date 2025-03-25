'use client';
import { createExperienceAction } from '@/actions/experienceActions';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ExperienceActionState, LocationObject } from '@/types/types';
import { getCoordinatesfromPlaceId } from '@/util/getCoordinationsfromPlaceId';
import { experienceSchema } from '@/util/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Challenge } from '@prisma/client';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import { useActionState, useCallback, useEffect, useState } from 'react';
import { StarRating } from 'react-flexible-star-rating';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import LocationInput from '../../components/LocationInput';

type Props = {
  challengeId: Challenge['id'];
};

export default function NewExperienceForm({ challengeId }: Props) {
  const [imageUrl, setImageUrl] = useState('');
  const [locationInputValue, setLocationInputValue] = useState('');

  const [rating, setRating] = useState(0);

  const [locationErrorMessage, setLocationErrorMessage] = useState('');
  const [location, setLocation] = useState<LocationObject>();

  const initialState = {
    error: {
      general: '',
    },
  };

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: '',
      date: undefined,
      story: '',
      imageUrl: '',
      challengeId: challengeId,
    },
  });

  const createExperienceActionWithLocation = createExperienceAction.bind(
    null,
    location,
  );

  const [state, formAction, pending] = useActionState(
    createExperienceActionWithLocation,
    initialState,
  );

  const { reset } = form;

  const [savedActionState, setSavedActionState] =
    useState<ExperienceActionState>(initialState);

  type UploadResult = {
    event: 'success';
    info: {
      secure_url: string;
    };
  };

  useEffect(() => setSavedActionState(state), [state]);

  function handleResetButtonClicked() {
    reset();
    setSavedActionState(initialState);
    setImageUrl('');
    setLocation(undefined);
    setLocationInputValue('');
  }

  const handleRatingChange = (ratingInput: number) => {
    setRating(ratingInput);
  };

  const handleLocationError = useCallback((error: string) => {
    setLocationErrorMessage(error);
  }, []);

  function handleLocationSelected(placeName: string, placeId: string) {
    setLocationInputValue(placeName);
    if (placeName && placeId) {
      getCoordinatesfromPlaceId(placeId)
        .then((coordinates) => {
          setLocation({
            name: placeName,
            lat: Number(coordinates.latitude),
            lon: Number(coordinates.longitude),
          });
        })
        .catch((error) => setLocationErrorMessage(error));
    }
  }

  function handleLocationInputChanged(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setLocationInputValue(event.currentTarget.value);
  }

  return (
    <>
      <Form {...form}>
        <form action={formAction}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">Title:</FormLabel>
                <FormControl>
                  <Input placeholder="I flew to the moon" {...field} />
                </FormControl>
                <FormMessage />
                <FormMessage>
                  {'error' in savedActionState && savedActionState.error.title}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-">
                <FormLabel className="text-sm font-bold">Date:</FormLabel>
                <Input
                  type="hidden"
                  {...field}
                  value={Boolean(field.value) ? field.value.toISOString() : ''}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          ' justify-start text-left font-normal',
                          !Boolean(field.value) && 'text-muted-foreground',
                        )}
                      >
                        {Boolean(field.value) ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      className="rdp p-3"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(fieldDate) =>
                        fieldDate.setHours(0, 0, 0, 0) >
                        new Date().setHours(0, 0, 0, 0)
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage>
                  {'error' in savedActionState && savedActionState.error.date}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="story"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="text-sm font-bold">
                  Write about your experience:
                </FormLabel>
                <FormControl>
                  <Textarea {...field} rows={8} />
                </FormControl>
                <FormMessage />
                <FormMessage className="">
                  {'error' in savedActionState && savedActionState.error.story}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2 mt-2">
            <p className="text-sm font-bold">Rating:</p>
            <StarRating
              onRatingChange={handleRatingChange}
              dimension={5}
              isHalfRatingEnabled
              color="#ff8c00"
            />
          </div>

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel className="text-sm font-bold hidden">
                  Rating (Hidden Input)
                </FormLabel>
                <FormControl>
                  <Input {...field} value={rating} type="hidden" />
                </FormControl>
                <FormMessage />
                <FormMessage>
                  {'error' in savedActionState && savedActionState.error.rating}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <h2 className="text-xl font-bold mt-2">Additional details:</h2>
            <div>
              {imageUrl && (
                <img
                  src={imageUrl}
                  width={135}
                  height={135}
                  alt="My experience"
                  className="mb-2 rounded-[5px]"
                />
              )}
              <CldUploadWidget
                onError={(error) => console.log(error)}
                signatureEndpoint="/api/sign-image"
                uploadPreset="bravetribe-experience-photos"
                onSuccess={(results) => {
                  const uploadResults = results as UploadResult;
                  console.log(results);
                  setImageUrl(uploadResults.info.secure_url);
                }}
                options={{
                  sources: ['local'],
                  cropping: true, // Zuschneiden aktivieren
                  croppingAspectRatio: 1, // 1:1 für quadratischen Ausschnitt
                  showSkipCropButton: false,
                  multiple: false,
                  maxFileSize: 1024 * 1024 * 5,
                }}
              >
                {({ open }) => {
                  return (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => open()}
                      className="w-[134px]"
                    >
                      {!imageUrl ? 'Upload a photo' : 'Change photo'}
                    </Button>
                  );
                }}
              </CldUploadWidget>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel className="text-sm font-bold hidden">
                      Image URL (Hidden Input)
                    </FormLabel>
                    <FormControl>
                      <Input {...field} value={imageUrl} type="hidden" />
                    </FormControl>
                    <FormMessage />
                    <FormMessage className="">
                      {'error' in savedActionState &&
                        savedActionState.error.imageUrl}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="challengeId"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel className="text-sm font-bold hidden">
                      Challenge ID (Hidden Input)
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="hidden" />
                    </FormControl>
                    <FormMessage />
                    <FormMessage className="">
                      {'error' in savedActionState &&
                        savedActionState.error.challengeId}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <label htmlFor="location" className="text-sm font-bold">
                Location:
              </label>
              {locationErrorMessage && (
                <p className="font-bold text-red-500">{locationErrorMessage}</p>
              )}
              <LocationInput
                value={locationInputValue}
                onLocationSelect={handleLocationSelected}
                onLocationError={handleLocationError}
                onChange={handleLocationInputChanged}
                id="location"
              />
              <FormMessage className="">
                {'error' in savedActionState && savedActionState.error.location}
              </FormMessage>
            </div>
          </div>
          <div className="flex justify-start w-full gap-x-2 mt-5">
            <Button
              variant="secondary"
              disabled={pending}
              className=""
              type="submit"
            >
              Save
            </Button>
            <Button
              variant="outline"
              className=""
              type="button"
              onClick={handleResetButtonClicked}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
      {'error' in savedActionState && savedActionState.error.general && (
        <p className="text-red-500 font-bold ">
          {savedActionState.error.general}
        </p>
      )}
    </>
  );
}
